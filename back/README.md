# API DOCUMENTATION

## Stack
+ NodeJs
+ Express
+ JWT
+ Mongoose

## Roles

The restfull API recognize 3 user roles: Admin, Manager, Normal. [Itself] it's not a real role in our API it means that the user can do the request over its own data with any role as for example add a new time.

## Request
### Auth
[POST]=> /auth/    <br/>
+ Create and get token
+ Parameters: {email,password} 
+ Response: { token, userId } 
+ Roles: [Itself] 

[DELETE]=> /auth/:token ( hashed in SHA256) <br/>
+ Revoke token
+ Roles: [Itself]

### Times
[POST] => /times/ <br/>
+ Add new time
+ Parameters: { date, distance, time, userId }
+ Roles: [Admin, Itself]


[DELETE] => /times/:id <br/>
+ Delete time
+ Roles: [Admin, Itself]


[GET] => /times/weekly/:userId <br/>
+ Report on average speed and distance per week
+ Roles: [Itself]

[GET] => /times/:userId/:from? <br/>
+ Get an array of times (from is optional but has to be in format dd-mm-yyyy)
+ Response: [{date, time, distance},{}]
+ Roles: [Admin, Itself]

[PUT] => /times/:id <br/>
+ Update time
+ Parameters: {date, time, distance}
+ Roles: [Admin, Itself]

### Users
[POST] => /users/ <br/>
+ Create new normal user
+ Parameters{firstName, lastName, email, password}
+ This is the only path which doesn´t need auth token

[DELETE] => /users/:userId <br/>
+ Delete user
+ Roles:[Admin,Manager,Itself]

[GET] => /users/:userId <br/>
+ Get one user
+ Response {firstName, lastName, email, id}

[GET] => /users/ <br/>
+ Get an array with all users ( with lower role )
+ Response [{firstName, lastName, email, id},{},{}]
+ Role: [Admin, Manager]


[PUT] => /users/:userId <br/>
+ Update user
+ Parameters: {firstName, lastName, email}
+ Role: [Admin, Manager]

  
 