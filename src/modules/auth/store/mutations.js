export const loginUser = (state, user) => {
    state.idUser = user.id
    state.user = user.name
    state.email = user.email
    state.idToken = user.token
    state.status = 'authenticated'
    localStorage.setItem('token', state.idToken)
}

export const authenticated = (state, idToken) => {
    state.status = 'authenticated'
    state.idToken = idToken
}

export const moviesFavs = (state, movies) => {
    state.moviesFav = movies
}

export const addNewFav = (state, movie) => {
    state.moviesFav = [...state.moviesFav, movie]
}

export const removeFavMovie = (state, idMovie) => {
    state.moviesFav = state.moviesFav.filter(movie => movie.id != idMovie)
}


export const logout = (state) => {
    localStorage.removeItem('token')
    state.status = 'authenticating'
    state.user = ''
    state.email = ''
    state.idUser = null
    state.moviesFav = []
    state.idToken = null
}
