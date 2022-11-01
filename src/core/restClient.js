import axios from 'axios'
import humps from 'humps'
import deepmerge from 'deepmerge'
import { camelCase } from 'change-case'
import { deepFormatStringToDate } from './index'
import history from './history'
import { rootPath } from 'routes'

import r from 'reactotron-react-js'

const baseUrl = process.env.REACT_APP_API_PATH + '/'
axios.defaults.baseURL = baseUrl

function convertToFormData(params, name = ``, form = new FormData()) {
  if (params instanceof Array) {
    params.forEach(
      (item) => {
        convertToFormData(item, `${name}[]`, form)
      }
    )
  } else if (params instanceof Object &&
    !(params instanceof Date) &&
    !(params instanceof File)) {
    Object.keys(params).forEach(
      (key) => {
        convertToFormData(params[key], name ? `${name}[${key}]` : key, form)
      }
    )
  }
  else if (params !== undefined && params !== null) {
    form.append(name, params)
  }

  return form
}

axios.interceptors.request.use(config => {
  const { data, params, ...others } = config

  var contentType = 'application/json'
  if (data !== undefined && data.headers !== undefined && data.headers['Content-Type'] !== undefined) {
    contentType = data.headers['Content-Type']
  }

  config = deepmerge(others, {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem('accesstoken')}`,
      authorization: `${localStorage.getItem('token')}`,
      Device: 'web',
      AppName: process.env.REACT_APP_NAME,
      'Content-Type': contentType
    },
    params,
    timeout: (contentType === 'multipart/form-data') ? 0 : process.env.REACT_APP_TIMEOUT,
    data: data !== undefined ? data.props : data
  })

  // Convert to FormData
  if (contentType === 'multipart/form-data') {
    if (Object.keys(data.props).length > 0) {
      config.data = convertToFormData(data.props)
    }
  }

  r.log({ request: config, url: config.url })
  return config
}, Promise.reject)

axios.interceptors.response.use(response => {
  response = humps.camelizeKeys(response, function (key, convert) {
    return camelCase(key)
  })
  response.data = deepFormatStringToDate(response.data)

  r.log({
    output: response,
    url: response.config.url.replace(axios.defaults.baseURL, ''),
  })

  return response
}, error => {

  r.log({
    error,
    data: error.response,
    url: error.config.url.replace(axios.defaults.baseURL, ''),
  })

  if (error.response.status === 503) {
    localStorage.setItem('maintenanceDescription', error.response.data.description)
    localStorage.setItem('maintenanceStartTime', error.response.data.startTime)
    localStorage.setItem('maintenanceEndTime', error.response.data.endTime)

    history.replace(rootPath)
    window.location.reload()
  } else {
    localStorage.removeItem('maintenanceDescription')
    localStorage.removeItem('maintenanceStartTime')
    localStorage.removeItem('maintenanceEndTime')
  }


  return Promise.reject(error.response)
})

export const httpGet = (url, params = {}, headers = {}) => axios.get(url, { params, headers })
export const httpPost = (url, props = {}, headers = {}, config = {}) => axios.post(url, { props, headers }, config)
export const httpPut = (url, props = {}, headers = {}) => axios.put(url, { props, headers })
export const httpPatch = (url, props = {}, headers = {}) => axios.patch(url, { props, headers })
export const httpDelete = (url, params = {}, headers = {}) => axios.delete(url, { params, headers })

export const customHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Platform: 'web',
}

// export const token = {
//   'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMjItMDktMjggMTU6NDM6MyIsImlhdCI6MTY2NDM1NDU4MywiZXhwIjoxNjY0NDQwOTgzfQ.yz50ZsOCZXmrjrf18OrwGt7l2YlpEGYBC2y1V-a_3aY',
//   'Content-Type': 'application/json'
// }

// export const customHeader1 = (url, props = {}, headers = {
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
//   Platform: 'web',
//   Authorization: localStorage.getItem('token')
// }, config = {}) => axios.post(url, { props, headers }, config)