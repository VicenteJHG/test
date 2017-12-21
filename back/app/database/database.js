
/********************************************************
    This component has been created to manage 
    all operations related with databases.

********************************************************/

var mysql           = require( 'mysql' ),
    q               = require( 'q' );


// Create a mysql connection and return it
function createConnection( database, port ) {
    // By default port is going to be 3306
    var deferred = q.defer(),
        dbConfig =  {
                        host: global.config.mysql_host,
                        user: global.config.mysql_username,
                        password: global.config.mysql_password,
                        database: database,
                        port: port || 3306,
                        multipleStatements: true
                    };

    var temp_connection = mysql.createConnection ( dbConfig ); 
    temp_connection.connect( function( err ) { 
        if( err ) {
            console.log( '  DB connection '+ database +'failed : ' + err );               
            deferred.reject( new Error( err ) );
        } else {
            deferred.resolve( temp_connection );
        }
    })

    return deferred.promise;
}


 
module.exports = {
    closeConections:function(){
       // It's here because of compatibilty reasons with old codes, but 
       // currently the connection is created and destroyed for each query so
       // we never should have open connections if they are not necessary
    },
  

    getQueryResult: function(  str_sql, database, callback ) { 
        var temp_connection = {},   
            skv_result      = {
                                'success': false,
                                'data': [],
                                'error':{}
                            };

        var cb    = function ( err, query_result ) {
                       // Close the connection 
                        temp_connection.end();
                        if ( err ) {
                            skv_result.error = err;
                        } else {
                            skv_result.success = true;
                            var json_result = JSON.parse( JSON.stringify( query_result ));
                            skv_result.data = json_result;
                        }
                       
                        callback( skv_result );
                    };

        var port    = global.config.master_port,
            match   = /[a-zA-Z]+/g.exec( str_sql );
     
        // Depending of the query we need to use master port or venus one
        if ( str_sql.substring( match.index, 6 ).toLowerCase() == 'select' &&
            !str_sql.toLowerCase().includes( 'delete' ) &&
            !str_sql.toLowerCase().includes( 'load' ) &&
            !str_sql.toLowerCase().includes( 'insert' )
            ) {

            port = global.config.venus_port;
        }
        
        createConnection( database , port )
            .then( function ( connection ) {
                temp_connection = connection;
                temp_connection.query( str_sql, cb );
            })   
            .catch(function( err ) {
                cb( err, '' );
            })  
    },


    // The difference between runQuery and getQueryResult is that runQuery just return
    // resolve or reject instead the result of the query
    runQuery: function(  str_sql, database ) {
        var deferred        = global.q.defer(),
            return_qry_rst  = function( query_rst ) {
                                if ( !query_rst.success ) {
                                    deferred.reject( query_rst.error );
                                }         
                                deferred.resolve( );
                            }
      
        module.exports.getQueryResult( str_sql, database, return_qry_rst ); 
        return deferred.promise; 
    }    
};
