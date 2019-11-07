<script> 
  import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)

  import pokedex_store from './modules/pokedex_store'
  import pokemon_store from './modules/pokemon_store'


  const store = new Vuex.Store({
    modules: {
      pokedex: pokedex_store,
      pokemon: pokemon_store
    }
  })

  export default store   
</script>