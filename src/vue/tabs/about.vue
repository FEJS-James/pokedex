<template>
  	<div  key="about" id="about" class="row ">
		<div  class='col-12'>
			<h3>Description</h3>
			<p>{{pokemon.about}}</p>
		</div>
		<div class='col-12 col-md-6'>
			<p class='tab-sub'>Height</p>
			<h3>{{pokemon.height}} Decentimetres</h3>
		</div>
		<div class='col-12 col-md-6'>
			<p class='tab-sub'>Happiness</p>
			<h3>{{pokemon.base_happiness}} </h3>
		</div>
		<div class='col-12 col-md-6'>
			<p class='tab-sub'>Weight</p>
			<h3>{{pokemon.weight}} Hectograms</h3>
 		</div>
		<div class='col-12 col-md-6'>
			<p class='tab-sub'>Habitat</p>
			<h3>{{pokemon.habitat}}</h3>
		</div>
		<div class='col-12 col-md-6'>
			<p class='tab-sub'>Shape</p>
			<h3>{{pokemon.shape}}</h3>
 		</div>
		<div class='col-12 col-md-6'>
			<p class='tab-sub'>Colour</p>
			<h3>{{pokemon.color.name}}</h3>
 		</div>
  	</div>
</template>

<script>
 
export default {
    name: 'about',
    el: "#about",
    mounted() { 
      console.log('MOUNTED ABOUT') 

     	this.pokemon = this.$store.state.pokemon.pokemon
	},
	props:{
	},
    data() {
      return {    
		  pokemon: null
      }
    },
    beforeDestroy() { 
    },
    computed: {  
    },
    methods: {  
    }
};
</script>
