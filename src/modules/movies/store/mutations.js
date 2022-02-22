export function setMovies (state, movies) {
    state.populares = movies[0].data.results
    state.evaluadas = movies[1].data.results
    state.estrenos = movies[2].data.results
}
