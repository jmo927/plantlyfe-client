import Api from '@/services/Api'

export default {
  fetchAllPlants () {
    return Api().get('/api/plants')
  },
  fetchDayPlants (data) {
    return Api().get(`/api/plants/${data}`)
  },
  addPlant (data) {
    return Api().post('/api/addplant', data)
  },
  updatePlant(data) {
    return Api().put(`/api/update/${data}`);
  },
  deletePlant(data) {
    return Api().delete(`/api/delete/${data}`)
  }
}