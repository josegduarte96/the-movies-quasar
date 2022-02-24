import xepelinApi from '../../../api/xepelinApi'
import tmdbApi from '../../../api/tmdbApi'
import { store } from 'quasar/wrappers'
// import { loginUser } from './mutations'


const idToken = localStorage.getItem('token')
export async function registerUser ({commit}, dataUser) {
    try {
        const resp = await xepelinApi.post('/register', dataUser)
        console.log(resp)
        commit('loginUser', resp.data)
        return {ok: true}
    } catch (error) {
        // Aca disparo una alerta
        return {ok: false, message: error.response.data.message}
    }

}

export const signInUser = async({commit}, dataUser) => {
try {
    const resp = await xepelinApi.post('/login', dataUser)
    commit('loginUser', resp.data)
    return {ok: true}
} catch (error) {
    return {ok: false, message: error.response.data.message}
}
}

export const checkAuthStatus = async({commit}) => {
    
    if (idToken) {        
        idToken && commit('authenticated', idToken)
        return {ok: true}
    } else {
        return {ok: false}
    }
    
}

export const addMovieFav = async({commit}, idMovie) => {
    try {
       const resp = await xepelinApi.post('/favorites', {movieId: idMovie}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken
            }
       })
       const { data } = await tmdbApi.get('movie/' + idMovie)
       commit('addNewFav', data)
       return {ok: true}
    } catch (error) {
        return {ok: false, message: error.response.data.message}
    }
}

export const removeFavorites = async({commit}, idMovie) => {
    try {
        await xepelinApi.delete('/favorites/' + idMovie, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken
            }
       })
        store.commit('removeFavMovie', idMovie)
        return {ok: true}
    } catch (error) {
        return {ok: false, message: error.response.data.message}
    }
}

export const getFavs = async({commit}) => {
    try {
        const resp = await xepelinApi.get('/favorites', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': idToken
            }
       })
        commit('moviesFavs', resp.data)
        return { resp, ok: true }
    } catch (error) {
        return {ok: false}
    }
}
