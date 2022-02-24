<template>
  <div class="text-white" style="width: 450px; max-width: 90vw">
    <q-form
      @submit="onSubmit"
      class="column q-pa-md"
    >    
    <h4 class="text-h4 text-weight-bold">Regístrate</h4>
    <h6 class="q-pb-lg text-body1">¡Disfruta de una experiencia personalizada!</h6>
      <q-input
        filled
        :disable="isLoading"
        color="secondary"
        dark
        v-model="useForm.name"
        label="Ingresa tu nombre *"
        style="width: 100%"
        class="col-3 self-center mb-2"
      />
      <q-input
        filled
        :disable="isLoading"
        color="secondary"
        dark
        type="email"
        v-model="useForm.email"
        label="Ingresa tu correo electronico *"
        style="width: 100%"
        class="col-3 self-center mb-2"
      />

      <q-input
        filled
        :disable="isLoading"
        color="secondary"
        dark
        type="password"
        v-model="useForm.password"
        label="Ingresa tu contraseña *"
        lazy-rules
        style="width: 100%"
        class="col-3 self-center mb-2"
      />
        
         <q-btn :disable="isLoading" class="col-3" style="height: 60px; width: 94%; max-width: 395px" type="submit" color="primary" label="Registrarse" />
         <q-btn :disable="isLoading" class="q-my-sm" @click="backHome" style="height: 40px; width: 94%; max-width: 395px" type="submit" color="indigo-3" label="Volver" />
    <h4 class="text-body1 mt-2">¿Ya tienes cuenta? <router-link class="text-white" :to="{name: 'login'}">Inicia sesión</router-link></h4>
    </q-form>
  </div>
  
</template>

<script>
import { ref} from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth'
import { useQuasar } from 'quasar'
export default {

setup(){
  const $q = useQuasar()
  const router = useRouter()
  const isLoading = ref(false)
  const useForm = ref({
    email: '',
    password: '',
    name: ''
  })
  
    const {createUser} = useAuth()
  
    
    return {
        useForm,
        backHome: () => router.push('/'),
        isLoading,
        onSubmit: async() => {
          isLoading.value = true
          $q.loading.show()
          let ok
          let message = null
          setTimeout(async() => {
            const resp = await createUser(useForm.value)
            ok = resp.ok
            message = resp.message
          }, 0);
          setTimeout(() => {
          if(!ok) {
             $q.loading.hide()
             isLoading.value = false
             return $q.notify({
              type: 'negative',
              message: message || 'Oops, hubo un problema al intentar registrarte.',
              timeout: 3000
              })
            } else {
              $q.loading.hide()
              return router.push('/logged')
            }
          }, 5500)
        },
  
    }
}

}
</script>

<style>

</style>