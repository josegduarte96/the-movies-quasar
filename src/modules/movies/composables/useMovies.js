import { computed } from 'vue'
import {useStore} from 'vuex'

const useMovies = () => {
    const store = useStore()

    const getMovies = async() => {
        const resp = await store.dispatch('movies/getMovies')
        return resp
    }

    return {
        getMovies,
        populares: computed(() => store.getters['movies/getPopularsMovies']),
        valoradas: computed(() => store.getters['movies/getMostRatedMovies']),
        estrenos: computed(() => store.getters['movies/getUpcomingMovies'])
    }
}

export default useMovies