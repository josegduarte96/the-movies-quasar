<template>
<q-dialog ref="dialogRef" @hide="onDialogCancel">
  <q-card class="row items-center justify-center font" style="width: 755px; max-width: 80vw; height: 525px; max-height: 80vh; q-pa-sm" flat bordered>
            <div class="col-xs-12 col-sm-12 col-md-6 col-6" style="height: 490px; max-height: 80vh; width: 330px">
              <q-img
            class="rounded-borders shadow-14"
            style="height: 94%; min-width: 290px; max-width: 330px"
            fit="contain"
            :src="data.imgModal"
            />
            </div>
            
            <div class="col-xs-12 col-sm-12 col-md-6 col-6">
              <q-scroll-area style="height: 490px; max-height: 90vh; max-width: 350px;">
              <div>
                <q-card-section class="text-h5 text-weight-bold">
                  {{ data.titleModal }}
                  <h6 v-if="data.categoria != 'favorites'" class="q-my-md">
                    <q-btn @click="addMovie"  size="md" round color="primary" icon="las la-plus"/>
                    Agregar a favoritas
                  </h6>
                  <h6 v-if="data.categoria == 'favorites'" class="q-my-md">
                    <q-btn @click="removeMovie" size="md" round color="negative" icon="las la-trash-alt"/>
                    Quitar de favoritas
                  </h6>
                  <q-separator class="q-my-md" color="dark" size="2px" inset />
                  <p class="text-justify text-h6 q-my-lg">{{data.textModal}}</p>
              </q-card-section>
              </div>
              </q-scroll-area>
            </div> 
  </q-card>
</q-dialog>
</template>

<script>
import { useDialogPluginComponent, useQuasar } from 'quasar'
import useAuth from 'src/modules/auth/composables/useAuth'

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    emits:{
      ...useDialogPluginComponent.emits
    },
    setup(props){
      const $q = useQuasar()
      const {setMovieFav, removeFavorites} = useAuth()
      const { dialogRef, onDialogCancel } = useDialogPluginComponent()
      return {
        dialogRef,
        addMovie: () => {
          $q.loading.show()
          let okey = null
          let msg = null
          setTimeout(async() => {
            const {ok, message} = await setMovieFav(props.data.idMovie)
            okey = ok || null
            msg = message || null
          }, 0);

          setTimeout(() => {
            if(okey) {
            $q.notify({
              icon: 'las la-check-circle',
              position: 'top',
              color: 'positive',
              message: 'Se agrego a favoritas!'
            })
            $q.loading.hide()
          } else {
            $q.loading.hide()
            $q.notify({
              icon: 'las la-times',
              position: 'top',
              color: 'negative',
              message: msg || 'Oops no pudimos agregarla a tu lista de favoritas.'
            })
          }
          }, 3000);
        },
        removeMovie: async() => {
          $q.loading.show()
          const {ok, message} = await removeFavorites(props.data.idMovie)
          if(ok) {
            $q.notify({
              icon: 'las la-check-circle',
              position: 'top',
              color: 'positive',
              message: 'Se elimino de favoritas!'
            })
            $q.loading.hide()
          } else {
            $q.loading.hide()
            $q.notify({
              icon: 'las la-times',
              position: 'top',
              color: 'negative',
              message: message || 'Oops no pudimos quitarla de tu lista de favoritas.'
            })
          }
        },
        onDialogCancel

      }
    }

}
</script>

<style>

</style>