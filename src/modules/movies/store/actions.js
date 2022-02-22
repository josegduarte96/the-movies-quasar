import moviesApi from '../../../api/tmdbApi'
export async function getMovies ({commit}) {
    try {
        const movies = await Promise.all([
            moviesApi.get('movie/popular'),
            moviesApi.get('movie/top_rated'),
            moviesApi.get('movie/upcoming'),
        ])
        commit('setMovies', movies)
        return {ok: true}
    } catch (error) {
        console.log(error)
        return {ok: false}
    }
}
