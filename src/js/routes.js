const start  =      () =>   import('@/vue/components/app_start');
const pokedex =     () =>   import('@/vue/components/app_pokedex');
const pokemon =     () =>   import('@/vue/components/app_pokemon');

const routes = [
    {
        path: '/',
        name: 'app_start',
        component: start
    },
    {
        path: '/pokedex',
        name: 'pokedex',
        component: pokedex
    },
    {
        path: '/pokemon-*',
        name: 'pokemon',
        component: pokemon
    },
    { path: '*', redirect: '/' }
 

];

export default routes;