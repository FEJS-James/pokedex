<script>
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const pokedex_store = {
    state: {
        isPokedexStore: true,
        p_api: null,
        generations: [],
        selected_pokemon: null,
        usable_pokemon_list: null,
        selected_generation: null,
        isLoading: false
    },
    getters: {
      filter_pokemon: (state) => (term) => { 
        return state.selected_pokemon.filter( pokemon =>  pokemon.name.includes(term)  )
      }
    },
    mutations: {
        commit_loading: (state, val) => {
            state.isLoading = val

        },
        commit_clear: (state) => {  
            state.selected_pokemon = null,
            state.usable_pokemon_list = null,
            state.selected_generation =  null

        },
        commit_api: (state, payload) => {
            state.p_api = payload.api;
        },
        commit_a_generation: (state, payload) => {
            state.generations.push(payload.gen);
        },
        commit_pokedex_set: (state, pokedex_set) => {
            state.selected_pokemon = pokedex_set;
            state.usable_pokemon_list = pokedex_set;
        },
        commit_selected_pokedex: (state, selected) => {
            state.selected_generation = selected.selected_pokedex.generation_name;
        },

        commit_new_searched_set: (state, set) => {
            state.usable_pokemon_list = set;
        },
        commit_reset_searched_set: state => {
            state.usable_pokemon_list = state.selected_pokemon;
        }
    },
    actions: {
        isLoading(context, load) {
            context.commit("commit_loading", load );
        },
        clear_pokdex(context) {
            context.commit("commit_clear" );
        },
        save_api(context, pokedex_api) {
            context.commit("commit_api", { api: pokedex_api.x });
        },
        save_generation(context, gen_dl) {
            context.commit("commit_a_generation", { gen: gen_dl.x });
        },
        save_pokedex_generation(context, selected_g) {
            context.commit("commit_selected_pokedex", {
                selected_pokedex: selected_g
            });
        },
        save_current_pokedex(context, result_set) { 
            return new Promise(() => { 
                context.commit("commit_pokedex_set",  result_set );
            });
        },

        search_generation(context, term) { 
          let a = this.getters.filter_pokemon(term)
            context.commit("commit_new_searched_set",a );
        },
        reset_pokedex(context) {
            context.commit("commit_reset_searched_set");
        }
    }
};
export default pokedex_store;
</script>