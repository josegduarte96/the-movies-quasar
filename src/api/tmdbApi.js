import axios from 'axios'

const moviesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '404826599a8dd2348c92029ed96cac19',
        language: 'es-AR'
    }
})

export default moviesApi