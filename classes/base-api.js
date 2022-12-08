import axios from '@/node_modules/axios/index'
import genQueryString from '@/src/utils/gen-querystring'

// create api as function with props of methods
const newApi = ({ url, item, options, id, filter }) => ({
  add () {
    return axios.post(url, item)
  },
  get () {
    // todo: look at vuetify options object for data table
    const query = []

    for (const [propName, propValue] in Object.entries(options)) {
      if (propValue) {
        query.push(genQueryString(propName, propValue))
      }
    }

    return axios.get(`${url}?${query}`)
  },

  getById () {
    return axios.get(`${url}/${id}`)
  },

  update () {
    return axios.put(url, item)
  }
})

const organizations = {
  filter: ['locations', 'contacts', 'malpracticeinsurances'], // search by items
  id: '',
  item: {},
  items: {},
  options: {},
  url: process.env.VUE_APP_API_BASE_URL + '/providers/organizations'
}
const organizationsApi = {
  ...newApi(organizations),
  other () {
    console.log('add other functions here')
  }
}
console.log(organizationsApi)
organizationsApi.add(organizations.item).then(
  (res) => {
    console.log(res)
  },
  (err) => console.error(err)
)
organizationsApi.get(organizations.options).then(
  (res) => {
    console.log(res)
  },
  (err) => console.error(err)
)
organizationsApi.getById(organizations.id).then(
  (res) => {
    console.log(res)
  },
  (err) => console.error(err)
)
organizationsApi.update(organizations.id).then(
  (res) => {
    console.log(res)
  },
  (err) => console.error(err)
)

// --------------------------

// create api as class with a constructor
export class Api {
  constructor (url) {
    this.url = url
  }

  add (item) {
    return axios.post(this.url, item)
  }

  get (options) {
    // todo: look at vuetify options object for data table
    const query = []

    for (const [propName, propValue] in Object.entries(options)) {
      if (propValue) {
        query.push(genQueryString(propName, propValue))
      }
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
