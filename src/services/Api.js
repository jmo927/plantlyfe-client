import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `https://plantlyfe-server.herokuapp.com`
  })
}