<template>
<q-layout view="hHh lpR fFf">  
  <q-page-container>
    <div id="header" class="">
    <!-- title y Paragraph -->
    <div class="container-sm column justify-center" style="height: 100%">
      <div class="col-auto">
        <q-btn round color="secondary" icon="las la-film" text-color="black" size="20px"></q-btn>
        <h2 class="text-white font text-h2 mt-4 p-2">Xepelin Movie Database</h2>
        <p id="text" class="p-2 text-weight-medium text-white font text-body1 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nihil alias quidem, commodi aperiam aliquam.</p>
      </div>
    </div>
    </div>
    <!-- container movies -->
    <div class="container-sm font p-1" style="100vh">
      <FavoritesMovies :breakpoints="breakpoints" :moviesFavorites="moviesFav"/>
      <PopularMovies :breakpoints="breakpoints" :moviesPopulars="moviesPopulars"/>
      <TopRatedMovies :breakpoints="breakpoints" :moviesRated="moviesRated"/>
      <UpComingMovies :breakpoints="breakpoints" :moviesUpcoming="moviesUpcoming"/>
    </div>
  </q-page-container>
   <!-- botones login sticky -->
     <q-page-sticky :class="scrollInfo" expand position="top">
      <q-scroll-observer @scroll="onScroll"/>
    <div class="full-width row wrap justify-end items-center content-start" style="height: 60px">
      <div style="overflow: auto; min-height: 80px; max-height: 70px;" class="q-gutter-sm m-1 col-auto self-end">
        <q-btn @click="closeSesion"  color="primary" class="text-bold" label="Cerrar Sesion" />
      </div>
    </div>
    </q-page-sticky>
</q-layout>
</template>

<script>
import useMovies from 'src/modules/movies/composables/useMovies'
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted, computed } from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import PopularMovies from '../components/PopularMovies.vue'
import TopRatedMovies from '../components/TopRatedMovies.vue'
import UpComingMovies from '../components/UpComingMovies.vue'
import FavoritesMovies from '../components/FavoritesMovies.vue'
import useAuth from 'src/modules/auth/composables/useAuth'


export default defineComponent({
  components: { PopularMovies, TopRatedMovies, UpComingMovies, FavoritesMovies },
  name: 'MainLayout',
  setup () {
    const $q = useQuasar()
    $q.addressbarColor.set('#5031a9')
    
    //  composables
   const { moviesFavorites } = useAuth()
   const { getMovies } = useMovies()
    // constantes
    const store = useStore()
    const router = useRouter()   
    const scrollInfo = ref('bg-transparent')
    // responsive carousel 
    const breakpoints = {
     400: { visibleSlides: 2, slideMultiple: 2, slideRatio: 1.3/1, arrowsOutside: false },
      600: { visibleSlides: 2, slideMultiple: 2, slideRatio: 1/1, arrowsOutside: false },
      800: {visibleSlides: 3, slideMultiple: 1, slideRatio: 0.8, arrowsOutside: true },
      1024: {visibleSlides: 3, slideMultiple: 1, slideRatio: 0.56/1, arrowsOutside: true },
      1250: {visibleSlides: 4, slideMultiple: 4, slideRatio: 0.45/1, arrowsOutside: true },
      1400: {visibleSlides: 6, slideMultiple: 1, slideRatio: 0.37/1, arrowsOutside: true }
      }
   
    
    // methods
    onMounted( async() => {
      await getMovies()
      await moviesFavorites()
    })
    
    const closeSesion = () => {
      console.log('d')
      store.commit('auth/logout')
      $q.loading.show({
        customClass: 'bg-primary'
      })
      setTimeout(() => {
        router.push('/')
        $q.loading.hide()
      }, 1500)
    }
    
    // const addFavorite = async(idMovie) => {
    //   if(userStatus.value != 'authenticated') {
    //     $q.notify({
    //         type: 'negative',
    //         message: 'Debes entrar a tu cuenta para hacer esta accion.',
    //         timeout: 3000
    //         })
    //   } else {
    //     $q.loading.show()
    //     const resp = await setMovieFav(idMovie)
    //     if (resp.ok) {
    //       // const res = await moviesFavorites()
    //       favorites.value.push(resp.data)
    //       $q.loading.hide()
    //       $q.notify({
    //         type: 'positive',
    //         message: 'Se agrego a tu lista de favoritos!.',
    //         timeout: 3000
    //         })
    //     } else {
    //       $q.loading.hide()
    //       $q.notify({
    //         type: 'negative',
    //         message: resp.message,
    //         timeout: 3000
    //         })
    //     }
    //   }
    // }

    // const removeFavorite = async(idMovie) => {
    //     $q.loading.show()
    //     console.log(idMovie)
    //     const resp = await removeFavorites(idMovie)
    //     if (resp.ok) {
    //       const indexMovie = favorites.value.indexOf(favorites.value.find(x => x.id === idMovie))
    //       favorites.value.splice(indexMovie, 1)
    //       $q.loading.hide()
    //       openModal.value = false
    //       $q.notify({
    //         type: 'positive',
    //         message: 'Se elimino de tu lista de favoritos!.',
    //         timeout: 3000
    //         })
    //     } else {
    //       $q.loading.hide()
    //       $q.notify({
    //         type: 'negative',
    //         message: resp.message,
    //         timeout: 3000
    //         })
    //     }
    //   openModal.value = false
    // }
    
    const onScroll = (info) => {
      if(info.position.top > 1) scrollInfo.value = 'bg-dark'
      else if(info.position.top == 0 ) scrollInfo.value = 'bg-transparent'
    }
    
    
    return {
      moviesFav: computed(() => store.getters['auth/userFav']),
      moviesPopulars: computed(() => store.getters['movies/getPopularsMovies']),
      moviesRated: computed(() => store.getters['movies/getMostRatedMovies']),
      moviesUpcoming: computed(() => store.getters['movies/getUpcomingMovies']),
      breakpoints,
      onScroll,     
      scrollInfo,
      closeSesion
    }
  }
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&display=swap');
.font{
  font-family: 'Space Grotesk';
}

.vueperslides__arrow {
  top: 36% !important;
}

#text{
  max-width: 550px;
  min-width: 20px;
}
#header{
background: url(../assets/hero-image.png);
background-repeat:no-repeat;
background-size:cover;
background-position:center;
height: 500px;
}

.my-card{
  width: 100%;
  max-width: 250px;
  height: 400px;
}

@media (max-width: 400px) {
  #slides{
    margin: 0 auto;
  }
}
@media (max-width: 600px) {
  #slides{
    margin: 0 auto;
  }
}

</style>
