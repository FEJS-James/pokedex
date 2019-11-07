<template>
  <div  key="app_pokemon" id="app_pokemon" class="main-content centralise-content-box">
    <div class='container'>
     <div id="pokedex_header" class='row pokemon_header'>
        <div class='col-12 col-md-6'> 
          <div class='back-container'> 
            <img src='/src/assets/img/back.svg' />
            <span @click.stop="return_appstart()">Back</span>
          </div>
        </div> 
      </div> 


      <div class='row pokemon-info'>
        <div class='col-12 col-md-4 '> 
          <div class=' pokemon-image-container' > 
            <div class='pokemon-image'>
              <div class="bg-box" :class="pokemon.color.name"></div>
              <img src="../../assets/img/pokeball.png" class="pokeball-bg">
              <img :src='`../../assets/img/pokemon/` + pokemon.id + `.png`'/>
            </div>
          </div>
        </div>
        <div class='col-12 col-md-8'>
          <div class='base-info'>
            <p class='order-num'>
              <span>Order No.</span>
              #{{ pokemon.order }}
            </p>
            <p class='subtitle-types'>
              <span v-for='(t, i) in pokemon.types' key='i' :data-pokemonType='i++' >
                <!-- <b  v-if="i > 1">/</b>  -->
                {{ t.type.name }}  
              </span>
            </p>
            <h1>{{ pokemon.name }}</h1>
            <div>
              <p>{{ pokemon.about }}</p>
            </div>
          </div>
        </div> 

      </div>
      <div class='row tabs-row'>
        <div @click.stop='show_about()' class='col-6 col-md-3'> 
          <span>About</span>
        </div>
        <div @click.stop='show_stats()' class='col-6 col-md-3'> 
          <span>Base stats</span>
        </div>
        <div @click.stop='show_evo()' class='col-6 col-md-3'> 
          <span  >Evolution</span>
        </div>
        <div @click.stop='show_moves()' class='col-6 col-md-3'> 
          <span >Moves</span>
        </div>
      </div>
      <div class='row tab-content'>
        <div class='col-12'>
          <div class='tab-inner-content'> 
            <about v-if='tab == "about"'  /> 
            <stats v-if='tab == "stats"' />  
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import about from "@/vue/tabs/about";
import stats from "@/vue/tabs/base_stats";
import pokedexHeader  from "@/vue/components/app_header";

export default {
    components: {
      pokedexHeader, 
      stats,
      about
    },

    name: 'app_pokemon',
    el: "#app_pokemon",
    mounted() { 
     this.pokemon = this.$store.state.pokemon.pokemon
      console.log('MOUNTED POKEMON COMPONENT....' + JSON.stringify(this.pokemon, null, 2 ))

    },
    data() {
      return {   
        pokemon: {},
        tab : "about"
      }
    },
    beforeDestroy() {
      this.pokemon = null
      this.$store.dispatch("reset_pokemon" ) 
    },
    computed: {  
    },
    methods: { 
      return_appstart: function(){
        this.$router.push('/pokedex')
      },
      show_about(){
        this.tab = "about" 
      },
      show_moves(){
        this.tab = "moves" 
      },
      show_stats(){
        this.tab = "stats" 
      },
      show_evo(){
        this.tab = "evolution" 
      }, 
    }
};
</script>
