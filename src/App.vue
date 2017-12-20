<template>
  <div id="app">
    <div class="header">              
            
              <div class="mars">
                <div class="planet"> </div>
              </div>

            
            
    header
    </div>
    <div class="container">
 
      <router-view/>
    </div>
    <div class="footer">
    fo0oter
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
 background: #031622;
}




 
@keyframes orbitmars   { 
  from { margin-left: 0%;  }
  to {margin-left: 20% ;} 
}
 
 





.mars {
  position: absolute;
  width: 35%;
  z-index:5;
  animation-delay: 2s;
  animation: orbitmars 1s infinite linear;

  top: 1px;
}

.planet {

  content: '';
    display: block;
    position: absolute;
    left: -2px;
    top: 0;
    width: 25px;
    height: 1px;
   background: -moz-linear-gradient(left,rgba(255,255,255,0) 0%,#ffffff 75%,#ffffff 100%);
     background: -webkit-linear-gradient(left,rgba(255,255,255,0) 0%,#ffffff 75%,#ffffff 100%);
  /*  background: linear-gradient(le bottom,rgba(255,255,255,0) 0%,#ffffff 75%,#ffffff 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff',endColorstr='#ffffff',GradientType=0);*/
 }





.header {
  padding-top: 30%;
  
 background: url(./assets/header_back.png) no-repeat  center;
   -webkit-background-size: cover;
   -moz-background-size: cover;
   -o-background-size: cover;
   background-size: cover;
}
</style>
