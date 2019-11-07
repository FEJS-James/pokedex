<template>
    <div key="app_start" id="app_start" class="main-content">
        <div :class="loaderObject" class='loader'>
            <div>
                <img src='../../assets/img/pokemon_loading.gif' />
            </div>
        </div>
        <div class="centralise-content-box">
            <div class="logo-hero-container">
                <img src="../../assets/img/pokemon-logo.png" />
            </div>
            <div class="container">
                <div class="row">
                    <div class="title-content col-12">
                        <h1>Choose Pokemon generation for your Pokedex</h1>
                        <p>Fill your pokedex with a specific pokemon generation or choose all pokemon to fill the pokedex.</p>
                    </div>
                </div>

                <div class="pokedex-selector row">
                    <div
                        v-for="generation in groups_list"
                        v-bind:key="generation.name"
                        class="col-12 col-sm-4 col-md-3 pokedex-generation"
                    >
                        <div
                            :id="generation.name"
                            class="inner-generation"
                            @click.stop="download_pokedex(generation)"
                        >
                            <p>{{ generation.group.start }} - {{ generation.group.end }}</p>
                            <p>{{ generation.name }}</p>
                            <img src="../../assets/img/pokeball.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var Pokedex_api = require("pokedex-promise-v2");

export default {
    name: "app_start",
    el: "#app_start",
    mounted() {
        this.p_api = new Pokedex_api();
        this.$store.dispatch("save_api", { x: this.p_api });
        if(!this.$store.state.pokedex.generations.length){
            this.generate_pokedex_groups();
        };
    },
    data() {
        return { 
            pokemon_arr: [],
            interval: {
                offset: 0,
                limit: 0
            },
            p_api: null
        };
    },
    watch: {},
    computed: {  
         loaderObject: function () {
            return {
                loading: this.$store.state.pokedex.isLoading,
            }
        },
        groups_list() {
            return this.$store.state.pokedex.generations;
        }
    },
    methods: {
        init: function() {},
        generate_pokedex_groups: function() {
            let _this = this;
            let poke_count = 0;

            _this.$store.state.pokedex.p_api
                .getGenerationsList()
                .then(response => {
                    response.results.forEach(element => {
                        _this.p_api.resource([element.url]).then(function(gr) {
                            const limit = gr[0].pokemon_species.length;
                            const grouped = poke_count + limit;
                            const name = gr[0].name;
                            let gen = {
                                name: name,
                                gen_length: limit,
                                group: {
                                    start: poke_count + 1,
                                    end: grouped
                                }
                            };
                            _this.$store.dispatch("save_generation", { x: gen });
                            poke_count = grouped;
                        });
                    });
                });
        },
        download_pokedex: function(obj) {

            this.$store.dispatch("isLoading", true) 
            this.$store.dispatch("save_pokedex_generation", { generation_name: obj.name }) 

            this.interval.offset = obj.group.start
            this.interval.limit = obj.gen_length - 1

            let _this = this;
            this.$store.state.pokedex.p_api
            .getPokemonsList(_this.interval)
            .then(function(all_pokes) {

                all_pokes.results.forEach(pokemon => { 
                   
                        

                    _this.$store.state.pokedex.p_api.resource(['/api/v2/pokemon/' + pokemon.name, '/api/v2/pokemon-species/' + pokemon.name])//.getPokemonSpeciesByName(pokemon.name) 
                    .then(function(data) {
                        let single_pokemon = data[0];
                        single_pokemon.shape = data[1].shape.name
                        single_pokemon.habitat = data[1].habitat.name
                        single_pokemon.base_happiness = data[1].base_happiness
                        single_pokemon.color = data[1].color
                        single_pokemon.about = data[1].flavor_text_entries.find( elem => elem.language.name == "en"  ).flavor_text
                        
                        _this.pokemon_arr.push(single_pokemon);
                    })
                    .catch(function(error) { 
                        console.log('individual pokemon download error: ' + error)
                    })
                    .finally(function(){
                        if(all_pokes.results.length == _this.pokemon_arr.length){
                            console.log('ALL POKEMON DOWNLOADED.....');
                           _this.complete_pokedex_load() 
                        }
                    })
                })

            });
        },
        complete_pokedex_load: function(){
            let _this = this

            Array.prototype.sortCallback = function(compareFunction, resultFunction){
                let result = this.sort(compareFunction);
                resultFunction(result);
            }

            this.pokemon_arr.sortCallback(function(a, b) {
                if (a.id < b.id) return -1;
                else if (a.id > b.id) return 1;
                return 0;

            }, function(sorted) { 
                _this.$store.dispatch("save_current_pokedex",  _this.pokemon_arr ) 
                _this.$store.dispatch("isLoading", false) 
                _this.$router.push('/pokedex')
            }); 
        }
    }
};
</script>