import {Store} from '../../../store/index'

  const isAuthGuard = async(to, from, next) => {
    let ok = null
    await Store.dispatch('auth/checkAuthStatus')
        .then( () => {
            ok = Store.state.auth.status === 'authenticated' ? true : false
        })
        .catch(() => {
            ok = false
        })

    if (ok) next()
    else next({path: '/'})


}

export default isAuthGuard