<template>
  <h5 class="mt-4 text-bold">Favoritas<i class="las la-arrow-right"></i></h5>
    <p v-if="moviesFavorites.length > 0" id="text" class="text-weight-medium font text-body1 mt-1 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <p v-if="moviesFavorites.length == 0" id="text" class="text-weight-medium font text-body1 mt-1 mb-3">No tienes peliculas Favoritas agregadas :( </p>
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
        <vueper-slide @click="modal('https://image.tmdb.org/t/p/w500' + i.poster_path, i.title, 'favorites', i.overview, i.id)" class="p-0 column" v-for="i in moviesFavorites" :key="i.id">
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
                <div v-if="active" class="text-body2 text-weight-bold">{{shortText(i.title)}}</div>
                <div v-if="active" class="text-subtitle2 text-accent text-weight-bold">{{setDateMovie(i.release_date)}}</div>
              </q-card-section>
            </q-card>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
</template>

<script>
import {useQuasar} from 'quasar'
import { onUpdated, ref} from 'vue'
import { setDateMovie, shortText } from '../helpers/index.js'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import ModalBody from '../components/ModalBody.vue'


export default {
    components: {
        VueperSlides,
        VueperSlide
    },
    props: {
        breakpoints: {
            type: Object,
            required: true
        },
        moviesFavorites: {
            type: Array,
            required: true
        }
    },
    setup(props) {
      onUpdated(() => {
        active.value = true
      })
        const active = ref(false)
        const $q = useQuasar()
        const modal = (imgModal, titleModal, categoria, textModal, idMovie) => {
            $q.dialog({
              component: ModalBody,
              componentProps: {
                data: {
                  imgModal,
                  titleModal,
                  categoria,
                  textModal,
                  idMovie
                }
              }
            })
        }
        return{
            setDateMovie,
            shortText,
            active,
            modal
        }
    }
}
</script>

<style>

</style>