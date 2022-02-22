<template>
  <div class="text-white" style="width: 450px; max-width: 90vw">
    <q-form
      @submit="onSubmit"
      class="column q-pa-md"
    >    
    <h4 class="text-h4 text-weight-bold">Inicia Sesión</h4>
    <h6 class="q-pb-lg">¡Qué bueno tenerte de vuelta!</h6>
  
      <q-input
        filled :disable="isLoading"
        color="secondary"
        dark
        type="email"
        v-model="useForm.email"
        label="Ingresa tu correo electronico *"
        style="width: 100%"
        class="col-3 self-center mb-2"
      />

      <q-input
        filled :disable="isLoading"
        color="secondary"
        dark
        type="password"
        v-model="useForm.password"
        label="Ingresa tu contraseña *"
        lazy-rules
        style="width: 100%"
        class="col-3 self-center mb-2"
      />
        
         <q-btn :disable="isLoading" class="col-3" style="height: 60px; width: 94%; max-width: 395px" type="submit" color="primary" label="Entrar" />
         <q-btn :disable="isLoading" class="q-my-sm" @click="backHome" style="height: 40px; width: 94%; max-width: 395px" type="submit" color="indigo-3" label="Volver" />

    <h4 class="text-body1 mt-2">¿No tienes cuenta? <router-link class="text-white" :to="{name: 'register'}">Registrate aqui</router-link></h4>    
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
  const { signInUser } = useAuth()
    const useForm = ref({
      email: '',
      password: ''
    })

    return {
        useForm,
        backHome: () => router.push('/'),
        isLoading,
        onSubmit: () => {
          isLoading.value = true
          $q.loading.show()
          let ok
          let message = null
          setTimeout(async() => {
            const resp = await signInUser(useForm.value)
            ok = resp.ok
            message = resp.message
          }, 0);
          setTimeout(() => {
          if(!ok) {
             $q.loading.hide()
             isLoading.value = false
             return $q.notify({
              type: 'negative',
              message: message || 'Oops, hubo un problema al intentar entrar.',
              timeout: 3000
              })
            } else {
              return router.push('/')
            }
          }, 5500)
        }
    }
}

}
</script>

<style>

</style>