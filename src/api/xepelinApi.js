import axios from 'axios'

const xepelinApi = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default xepelinApi