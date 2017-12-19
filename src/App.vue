<template>
  <div id="app">
    <div class="header">              
            
              <div class="mars">
                <div class="planet"><div class="shadow"></div></div>
              </div>
            
            
    header
    </div>
    <div class="container">
      container
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




 
@keyframes orbitmars {
  0% { z-index:5; transform: rotateY(0); }
  49% { z-index:5; }
  50% { z-index:-5; }
  99% { z-index:-5; }
  100%   { z-index:5; transform: rotateY(360deg); }
}
/* Keep planet image flat */
@keyframes anti-spin {
  from { transform: rotateY(0); }
  to   { transform: rotateY(-360deg); }
}
 


 
.shadow {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: transparent url(http://www.waynedunkley.com/img/solar_system/shadow.png) 0% 0% no-repeat;
  background-size: cover;
  border-radius: 100%;
}


.mars {
  position: absolute;
  width: 100%;
  z-index:5;
  animation: orbitmars 30s infinite linear;
  top: -11px;
}
.mars .planet {
  width:22px;
  height:22px;
  background-color: red;
  animation: anti-spin 30s infinite linear;
}
.mars .shadow {
  animation: shadow 30s infinite linear;
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
