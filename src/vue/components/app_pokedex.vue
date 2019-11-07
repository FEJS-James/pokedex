<template>
    <div  key="app_pokedex" id="app_pokedex" class="main-content centralise-content-box">
        <pokedexHeader> </pokedexHeader>
        <div class='container'> 
            <transition-group name="animate_tile"  tag="div" class='pokedex-selector row'>
                <div    v-for="pokemon in pokedex_list"
                        v-bind:key='pokemon.name'
                        class="col-12 col-sm-4 col-md-3 pokedex-item"
                        @click.stop="view(pokemon)"
                >
                    <div
                        :id="pokemon.name"
                        class="inner-pokemon" 
                    >
                        <div class='bg-box' :class="colorClass(pokemon)" ></div>
                        <div class='pokemon-data'> 
                            <p class='item-num'>#{{ pokemon.id}} </p>
                            <p class='item-title'>{{ pokemon.name }}</p>
                            <div class='item-types'>
                                <p  v-for="t in pokemon.types" 
                                    v-bind:key="pokemon.name" >
                                    <span>{{ t.type.name }}</span>
                                </p> 
                            </div>
                            <img class='pokeball-bg' src="../../assets/img/pokeball.png" />
                            <img class='pokemon-img' :src="`../../assets/img/pokemon/` + pokemon.id + `.png`" />
                        </div>
                    </div>
                </div>
            </transition-group>
        </div> 
    </div>
</template>

<script>

import pokedexHeader  from "@/vue/components/app_header";

export default {
    components: {
        pokedexHeader
    },
    name: 'app_pokedex',
    el: "#app_pokedex",
    mounted() {
        console.log('MY mounted pokedex....')
        
    },    
    beforeDestroy() {
    },
    data() {
        return { 
        } 
    }, 
    computed: { 
        pokedex_list() {
            // console.log(JSON.stringify(this.$store.state.pokedex.selected_pokemon.x))
            return this.$store.state.pokedex.usable_pokemon_list
        }
    },
    methods: {
        get_types(p){
            console.log('pppp' + JSON.stringify(p.types))
            return p.types
        },
        colorClass: function(p){
            return p.color.name
        },
        view: function(pokemon){
            this.$store.dispatch("save_pokemon", pokemon);
            this.$router.push('/pokemon-'+ encodeURI(pokemon.name))
        }
    }
};
</script>
