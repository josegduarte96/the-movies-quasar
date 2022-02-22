export function getPopularsMovies (state) {
    return state.populares
}
export function getMostRatedMovies (state) {
    return state.evaluadas
}
export function getUpcomingMovies (state) {
    return state.estrenos
}

export function getAllMovies(state) {
    return [...state.populares, ...state.estrenos, ...state.evaluadas]
}