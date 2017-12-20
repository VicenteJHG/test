<template>
  <div class="main">
  		<template>
	  		<div>
	  			


	  		</div>
  		</template>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  created: function() { 
console.log(axios.defaults.headers.common);
  	axios.get('https://euw1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&tags=all&dataById=false').
  		then((response)=>{ console.log(response)})
  		.catch((err) => console.log(err));
  }

 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
