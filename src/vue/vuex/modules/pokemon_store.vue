<script>
  import Vue from 'vue'
  import Vuex from 'vuex'
  Vue.use(Vuex)
  
  const pokemon_store =  {

    state: {
      pokemon: null
    },
    getters: { 
    },
    mutations: { 
        commit_pokemon: (state, pokemon) => {
            state.pokemon = pokemon;
        },
        commit_reset: (state) => {
            state.pokemon = null;
        },
    },
    actions: {  
        save_pokemon(context, pokemon) {
            context.commit("commit_pokemon", pokemon);
            console.log('STORING POKEMON : ' +pokemon)
        },
        reset_pokemon(context) {
            context.commit("commit_reset");
        },
    }

  }
  export default pokemon_store

</script>