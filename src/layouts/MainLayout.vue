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
      <!-- movies -->
    <div v-if="userStatus != 'authenticating' && favorites.length > 0">
      <h5 class="mt-4 text-bold">Favoritas<i class="las la-arrow-right"></i></h5>
    <p id="text" class="text-weight-medium font text-body1 mt-1 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <div class="row mt-2 w-full" style="height: 450px;">
      <vueper-slides
      id="slides"
      class="no-shadow col-auto p-1 col-xs-11 col-sm-11"
      fade
      :visible-slides="5"
      :slide-multiple="true"
      :gap="1"
      :disableArrowsOnEdges="true"
      :bullets="false"
      :slide-ratio="1/3"
      :dragging-distance="300"
      :breakpoints="breakpoints">
      <template #arrow-left>
        <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-left"
        />
      </template>
      <template #arrow-right>
       <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-right"
        />
      </template>
        <vueper-slide @click="modal(favorites.indexOf(i), 'favorites')" class="p-0 column" v-for="i in favorites" :key="i.id">
          <template #content>               
            <q-card flat :bordered="false" class="my-card col-12 cursor-pointer">
                <q-img spinner-color="primary" fit="cover" class="col-12 rounded" style="height: 320px; max-width: 100%" :src="'https://image.tmdb.org/t/p/w500' + i.poster_path">
                  <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-primary text-white">
                    No se pudo obtener la imagen
                  </div>
                </template>
                </q-img>
              <q-card-section class="p-1 mt-2">
                <div class="text-body2 text-weight-bold">{{shortText(i.title)}}</div>
                <div class="text-subtitle2 text-accent text-weight-bold">{{setDateMovie(i.release_date)}}</div>
              </q-card-section>
            </q-card>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
    </div>
    <h5 class="mt-4 text-bold">Más Populares<i class="las la-arrow-right"></i></h5>
    <p id="text" class="text-weight-medium font text-body1 mt-1 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <div class="row mt-2 w-full" style="height: 450px;">
      <vueper-slides
      id="slides"
      class="no-shadow col-auto p-1 col-xs-11 col-sm-11"
      fade
      :visible-slides="5"
      :slide-multiple="true"
      :gap="1"
      :disableArrowsOnEdges="true"
      :bullets="false"
      :slide-ratio="1/3"
      :dragging-distance="300"
      :breakpoints="breakpoints">
      <template #arrow-left>
        <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-left"
        />
      </template>
      <template #arrow-right>
       <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-right"
        />
      </template>
        <vueper-slide @click="modal(moviesPopulars.indexOf(i), 'populares')" class="p-0 column" v-for="i in moviesPopulars" :key="i.id">
          <template #content>               
            <q-card flat :bordered="false" class="my-card col-12 cursor-pointer">
                <q-img spinner-color="primary" fit="cover" class="col-12 rounded" style="height: 320px; max-width: 100%" :src="'https://image.tmdb.org/t/p/w500' + i.poster_path">
                  <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-primary text-white">
                    No se pudo obtener la imagen
                  </div>
                </template>
                </q-img>
              <q-card-section class="p-1 mt-2">
                <div class="text-body2 text-weight-bold">{{shortText(i.title)}}</div>
                <div class="text-subtitle2 text-accent text-weight-bold">{{setDateMovie(i.release_date)}}</div>
              </q-card-section>
            </q-card>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
    <h5 class="mt-4 text-bold">Más Evaluadas<i class="las la-arrow-right"></i></h5>
    <p id="text" class="text-weight-medium font text-body1 mt-1 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <div class="row mt-2 w-full" style="height: 450px;">
      <vueper-slides
      id="slides"
      class="no-shadow col p-1 col-xs-11 col-sm-11"
      fade
      :visible-slides="5"
      :slide-multiple="true"
      :gap="1"
      :disableArrowsOnEdges="true"
      :bullets="false"
      :slide-ratio="1/3"
      :dragging-distance="50"
      :breakpoints="breakpoints">
      <template #arrow-left>
        <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-left"
        />
      </template>

      <template #arrow-right>
       <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-right"
        />
      </template>
        <vueper-slide @click="modal(moviesRated.indexOf(i), 'valoradas')" class="p-0 column" v-for="i in moviesRated" :key="i.id">
          <template #content>         
            <q-card flat :bordered="false" class="my-card col-12 cursor-pointer">
                <q-img spinner-color="primary" fit="cover" class="col-12 rounded" style="height: 320px; max-width: 100%" :src="'https://image.tmdb.org/t/p/w500' + i.poster_path">
                  <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-primary text-white">
                    No se pudo obtener la imagen
                  </div>
                </template>
                </q-img>
              <q-card-section class="p-1 mt-2">
                <div class="text-body2 text-weight-bold">{{shortText(i.title)}}</div>
                <div class="text-subtitle2 text-accent text-weight-bold">{{setDateMovie(i.release_date)}}</div>
              </q-card-section>
            </q-card>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
    <h5 class="mt-4 text-bold">Próximos Estrenos<i class="las la-arrow-right"></i></h5>
    <p id="text" class="text-weight-medium font text-body1 mt-1 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <div class="row mt-2 w-full" style="height: 450px;">
      <vueper-slides
      id="slides"
      class="no-shadow col p-1 col-xs-11 col-sm-11"
      fade
      :visible-slides="5"
      :slide-multiple="true"
      :gap="1"
      :disableArrowsOnEdges="true"
      :bullets="false"
      :slide-ratio="1/3"
      :dragging-distance="50"
      :breakpoints="breakpoints">
      <template #arrow-left>
        <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-left"
        />
      </template>

      <template #arrow-right>
       <q-btn
        round
        color="primary"
        size="lg"
        icon="las la-arrow-right"
        />
      </template>
        <vueper-slide @click="modal(moviesUpcoming.indexOf(i), 'estrenos')" class="p-0 column" v-for="i in moviesUpcoming" :key="i.id">
          <template #content>         
            <q-card flat :bordered="false" class="my-card col-12 cursor-pointer">
                <q-img spinner-color="primary" fit="cover" class="col-12 rounded" style="height: 320px; max-width: 100%" :src="'https://image.tmdb.org/t/p/w500' + i.poster_path">
                  <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-primary text-white">
                    No se pudo obtener la imagen
                  </div>
                </template>
                </q-img>
              <q-card-section class="p-1 mt-2">
                <div class="text-body2 text-weight-bold">{{shortText(i.title)}}</div>
                <div class="text-subtitle2 text-accent text-weight-bold">{{setDateMovie(i.release_date)}}</div>
              </q-card-section>
            </q-card>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
    </div>
    <!-- modal Movies -->
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="openModal">
      <q-card class="row items-center justify-center font" style="width: 755px; max-width: 80vw; height: 525px; max-height: 80vh; q-pa-sm" flat bordered>
            <div class="col-xs-12 col-sm-12 col-md-6 col-6" style="height: 490px; max-height: 80vh; width: 330px">
              <q-img
            class="rounded-borders shadow-14"
            style="height: 94%; min-width: 290px; max-width: 330px"
            fit="contain"
            :src="imgModal"
            />
            </div>
            
            <div class="col-xs-12 col-sm-12 col-md-6 col-6">
              <q-scroll-area style="height: 490px; max-height: 90vh; max-width: 350px;">
              <div>
                <q-card-section class="text-h5 text-weight-bold">
                  {{ titleModal }}
                  <h6 v-if="categoria != 'favorites'" class="q-my-md">
                    <q-btn @click="addFavorite(idMovie)" size="md" round color="primary" icon="las la-plus"/>
                    Agregar a favoritas
                  </h6>
                  <h6 v-if="categoria == 'favorites'" class="q-my-md">
                    <q-btn @click="removeFavorite(idMovie)" size="md" round color="negative" icon="las la-trash-alt"/>
                    Quitar de favoritas
                  </h6>

                  <q-separator class="q-my-md" color="dark" size="2px" inset />
                  <p class="text-justify text-h6 q-my-lg">{{textModal}}</p>
              </q-card-section>
              </div>
              </q-scroll-area>
            </div>
            
        </q-card>
    </q-dialog>
  </div>              
  </q-page-container>
   <!-- botones login sticky -->
     <q-page-sticky :class="scrollInfo" expand position="top">
      <q-scroll-observer @scroll="onScroll"/>
    <div class="full-width row wrap justify-end items-center content-start" style="height: 60px">
      <div style="overflow: auto; min-height: 80px; max-height: 70px;" class="q-gutter-sm m-1 col-auto self-end">
        <q-btn v-if="userStatus != 'authenticated'" @click="signip" color="primary" class="text-bold" label="Entrar"  />
        <q-btn v-if="userStatus != 'authenticated'" @click="signup" color="primary" class="text-bold" label="Registrarse" />
        <q-btn v-if="userStatus != 'authenticating'" @click="closeSesion"  color="primary" class="text-bold" label="Cerrar Sesion" />
      </div>
    </div>
    </q-page-sticky>
</q-layout>
</template>

<script>


import useAuth from 'src/modules/auth/composables/useAuth'
import useMovies from 'src/modules/movies/composables/useMovies'
import { useQuasar } from 'quasar'
import { defineComponent, ref, onMounted, computed } from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { userStatus } from 'src/modules/auth/store/getters'

// import getMovies from '../../src/helpers/getMovies'

export default defineComponent({
  components: { VueperSlides, VueperSlide },
  name: 'MainLayout',
  setup () {
    const $q = useQuasar()
    $q.addressbarColor.set('#5031a9')
    $q.loading.show({
        customClass: 'bg-primary'
    })
    setTimeout(() => {
      $q.loading.hide()
    }, 6000);
    //  composables
   const { checkAuth, logout, setMovieFav, moviesFavorites, removeFavorites } = useAuth()
   const { getMovies, populares, valoradas, estrenos } = useMovies()
   checkAuth()
    // constantes
    const store = useStore()
    const router = useRouter()   
    const categoria = ref('') 
    const favorites = ref([])
    const moviesRated = ref([])
    const moviesPopulars = ref([])
    const moviesUpcoming = ref([])
    const titleModal = ref('')
    const textModal = ref('')
    const imgModal = ref('')
    const scrollInfo = ref('bg-transparent')
    const openModal = ref(false)
    const idMovie = ref(null)
    const userStatus = computed(() => store.getters['auth/userStatus'])
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
      const resp = await checkAuth()
      moviesRated.value = valoradas.value
      moviesPopulars.value = populares.value
      moviesUpcoming.value = estrenos.value
      if(!resp.ok) return
      const {allMoviesFav} = await moviesFavorites()
     favorites.value = allMoviesFav
    })
    
    const closeSesion = async() => {
      $q.loading.show({
        customClass: 'bg-primary'
      })
      setTimeout(() => {
        logout()
        $q.loading.hide()
        router.push('/sign-ip')
      }, 3000);
    }
    
    const addFavorite = async(idMovie) => {
      if(userStatus.value != 'authenticated') {
        $q.notify({
            type: 'negative',
            message: 'Debes entrar a tu cuenta para hacer esta accion.',
            timeout: 3000
            })
      } else {
        $q.loading.show()
        const resp = await setMovieFav(idMovie)
        if (resp.ok) {
          // const res = await moviesFavorites()
          favorites.value.push(resp.data)
          $q.loading.hide()
          $q.notify({
            type: 'positive',
            message: 'Se agrego a tu lista de favoritos!.',
            timeout: 3000
            })
        } else {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: resp.message,
            timeout: 3000
            })
        }
      }
    }

    const removeFavorite = async(idMovie) => {
        $q.loading.show()
        console.log(idMovie)
        const resp = await removeFavorites(idMovie)
        if (resp.ok) {
          const indexMovie = favorites.value.indexOf(favorites.value.find(x => x.id === idMovie))
          favorites.value.splice(indexMovie, 1)
          $q.loading.hide()
          openModal.value = false
          $q.notify({
            type: 'positive',
            message: 'Se elimino de tu lista de favoritos!.',
            timeout: 3000
            })
        } else {
          $q.loading.hide()
          $q.notify({
            type: 'negative',
            message: resp.message,
            timeout: 3000
            })
        }
      openModal.value = false
    }
    
    const onScroll = (info) => {
      if(info.position.top > 1) scrollInfo.value = 'bg-dark'
      else if(info.position.top == 0 ) scrollInfo.value = 'bg-transparent'
    }
    
    const modal = (i, cat) => {
        openModal.value = true
        if (cat == 'populares') {
          categoria.value = 'populares'
          idMovie.value = populares.value[i].id
          titleModal.value = populares.value[i].title
          imgModal.value = 'https://image.tmdb.org/t/p/w500' + populares.value[i].poster_path
          textModal.value = populares.value[i].overview
        } else if (cat == 'valoradas') {
          categoria.value = 'valoradas'
          idMovie.value = valoradas.value[i].id
          titleModal.value = valoradas.value[i].title
          imgModal.value = 'https://image.tmdb.org/t/p/w500' + valoradas.value[i].poster_path
          textModal.value = valoradas.value[i].overview
        } else if (cat == 'estrenos') {
          categoria.value = 'estrenos'
          idMovie.value = estrenos.value[i].id
          titleModal.value = estrenos.value[i].title
          imgModal.value = 'https://image.tmdb.org/t/p/w500' + estrenos.value[i].poster_path
          textModal.value = estrenos.value[i].overview
        } else if (cat == 'favorites') {
          categoria.value = 'favorites'
          idMovie.value = favorites.value[i].id
          titleModal.value = favorites.value[i].title
          imgModal.value = 'https://image.tmdb.org/t/p/w500' + favorites.value[i].poster_path
          textModal.value = favorites.value[i].overview
        }
    }
    
    return {
      userStatus,
      categoria,
      favorites,
      addFavorite,
      breakpoints,
      closeSesion,
      moviesRated,
      idMovie,
      removeFavorite,
      imgModal,
      modal,
      onScroll,
      openModal,
      moviesPopulars,
      scrollInfo,
      setDateMovie: (dateMovie) => new Date(dateMovie).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      shortText: (text) => text.length > 20 ? text.slice(0, 20) + '...' : text,
      signip: () => router.push('/sign-ip'),
      signup: () => router.push('/sign-up'),
      textModal,
      titleModal,
      moviesUpcoming,
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
