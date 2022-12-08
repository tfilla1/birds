import axios from '@/node_modules/axios/index'
import genQueryString from '@/src/utils/gen-querystring'

export class Api {
  constructor (url) {
    this.url = url
  }

  add (item) {
    return axios.post(this.url, item)
  }

  get (options) {
    const query = []

    for (const [propName, propValue] in Object.entries(options)) {
        if (propValue) { query.push(genQueryString(propName, propValue))}
    }

    return axios.get(`${this.url}?${query}`)
  }

  getById ({ id }) {
    return axios.get(`${this.url}/${id}`)
  }

  delete (item) {
    return axios.delete(this.url, item)
  }

  update (item) {
    return axios.put(this.url, item)
  }
}

const id = 'ba677dc0-47a0-4034-be2f-2eefcd025e2c'
const url = process.env.VUE_APP_API_BASE_URL + '/notes'
const notesApi = new Api(url)

notesApi.get(id).then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.error(err)
  }
)


const breadApi = {
    ...Api,
    search(options) {
    const query = []
    for (const [propName, propValue] in Object.entries(options)) {
        if (propValue) { query.push(genQueryString(propName, propValue))}
    }

    return axios.get(`${this.url}?${query}`)
    }
}