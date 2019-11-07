//load style & jquery
import '@/style/sass/styles.sass';
var $ = require("jquery"); 

// Import Vue
import Vue from 'vue';
import VueRouter from 'vue-router';  
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.use(VueRouter);

//import application files
import App from "@/vue/app";
import store from "@/vue/vuex/app_store";
import routes from './routes';
 
(function () { 
    $(window).on('load', function () {  });
    $(window).on('scroll', function () { });
    $(document).ready(function () {
        app_init.ready();
    });
    const app_init = {
        ready: function ready() {
            app.init();
        }
    };

    const app = { 
        init: function init() {
            this.vue_router.init();
            this.pokedex.init();
        },  
        vue_router: {
            app_router : null,
            init: function init(){ 
                this.app_router = new VueRouter({
                    routes, 
                    mode: 'history'
                });
            }   
        } ,
        pokedex: {
            init: function init() {   
                new Vue({
                    el: '#app',
                    render: h => h(App),
                    store, 
                    router:  app.vue_router.app_router
                });
            }
        }
    }
})();
