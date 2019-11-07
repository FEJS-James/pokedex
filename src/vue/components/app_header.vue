<template>
  <div  key="pokedex_header" id="pokedex_header"  class='container'>
    <div class='row'>
      <div class='col-12 col-md-6'> 
        <div class='back-container'> 
          <img src='/src/assets/img/back.svg' />
          <span @click.stop="return_appstart()">Back</span>
        </div>
      </div> 
      <div class='col-12 col-md-6 search-container'>
        <form class='search_pokedex'>
          <input type='search' placeholder='Search' v-model="search_term"/> 
        </form>
      </div>
    </div>
    <div class='row'>
      <div class='pokedex-info col-12'>
        <h1>Pokedex</h1>
        <p class='subtitle'>Browse pokemon from {{ selected_generation }}</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "pokedexHeader",
    el: "#pokedex_header", 
    mounted() {
      this.selected_generation =  this.$store.state.pokedex.selected_generation

    },
    data() {
        return {
          selected_generation : "",
          search_term : ""
        };
    },
    watch:{
      search_term: function(){
        if(this.search_term.length){
          this.$store.dispatch("search_generation",  this.search_term );
        }else{
          this.$store.dispatch("reset_pokedex");
        }
      }
    },
    computed: { 
    },
    methods: {
        return_appstart: function(){
          this.$router.push('/')
        }
    }
};
</script>