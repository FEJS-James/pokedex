<template>
  <body id="app">
    <!-- <pokedexHeader /> -->
    <main>  
      <!-- <button @click="close_component()" :class="display_close" class='circle-btn right-floating-btn'>
        <img src='/assets/img/close.svg' />
      </button>     -->
 
      <transition name="fade"  mode="out-in">
        <router-view>
          <app_start />
        </router-view>
      </transition>
    </main>
   </body>
</template>

<script>
import app_start  from "@/vue/components/app_start";
import app_pokedex  from "@/vue/components/app_pokedex";
import app_pokemon  from "@/vue/components/app_pokemon";
import pokedexHeader  from "@/vue/components/app_header";

export default {
  name: "App",
  el: "#app",
  components: {
    pokedexHeader, 
    app_start,
    app_pokedex,
    app_pokemon
  },
  data() {
    return { 
      route_home: true
    }
  },
  computed: { 
    display_close: function () {
      return {
        display_close: this.route_home
      }   
    }
  },
  watch: {
    $route: function() {
       this.route_home =  (this.$route.path !== "/")  
    }
  },
  methods: {
    close_component(){
        this.$router.push('/')
    }
  }
};
</script>
