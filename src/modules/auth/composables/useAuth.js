import { computed } from 'vue'
import {useStore} from 'vuex'


const useAuth = () => {
    const store = useStore()

   const createUser = async(user) => {
       const resp = await store.dispatch('auth/registerUser', user)
       return resp
   }

   const signInUser = async(user) => {
       const resp = await store.dispatch('auth/signInUser', user)
       return resp
   }

   const checkAuth = async() => {
       const resp = await store.dispatch('auth/checkAuthStatus')
       return resp
   }

   const setMovieFav = async(idMovie) => {
       const resp = await store.dispatch('auth/addMovieFav', idMovie)
       return resp
   }

//    en este metodo obtengo las movies favoritas del usuario y las busco en un array de todas las peliculas que estan
   const moviesFavorites = async() => {
       const resp = await store.dispatch('auth/getFavs')
       if(!resp.ok) return {ok: false}
       const moviesFav = resp.ok && store.state.auth.moviesFav
       const allMoviesFav = []
       const allMovies = computed(() => store.getters['movies/getAllMovies'])
       for (let i = 0; i < allMovies.value.length; i++) {
           for (let e = 0; e < moviesFav.length; e++) {
               if(moviesFav[e].movieId == allMovies.value[i].id) {
                   allMoviesFav.push(allMovies.value[i])
               }
               
           }           
       }
       store.commit('auth/moviesFavs', allMoviesFav)
       return {ok: true}
   }

   const removeFavorites = async(idMovie) => {
    const resp = await store.dispatch('auth/removeFavorites', idMovie)
    return resp
   }
   
    return {
        createUser,
        signInUser,
        checkAuth,
        setMovieFav,
        removeFavorites,
        moviesFavorites
    }
}

export default useAuth