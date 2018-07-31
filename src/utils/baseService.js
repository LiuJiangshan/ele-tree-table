import config from '../config.js'
import axios from 'axios'

export default function getService (name) {
  // 基本url
  const url = `${config.apiUrl}/${name}`
  const getFixUrl = function (fixAppendName) {
    return fixAppendName ? `${url}/${fixAppendName}` : url
  }
  const getAxiosConfig = function (type, fixAppendName) {
    return {
      url: getFixUrl(fixAppendName),
      method: type
    }
  }
  // get请求
  const GET = function (params, fixAppendName) {
    const axiosConfig = getAxiosConfig('GET', fixAppendName)
    if (params) axiosConfig.params = params
    return axios(axiosConfig)
  }
  // post请求
  const POST = function (data, fixAppendName) {
    const axiosConfig = getAxiosConfig('POST', fixAppendName)
    if (data) axiosConfig.data = data
    return axios(axiosConfig)
  }
  // put请求
  const PUT = function (data, fixAppendName) {
    const axiosConfig = getAxiosConfig('PUT', fixAppendName)
    if (data) axiosConfig.data = data
    return axios(axiosConfig)
  }
  // delete请求
  const DELETE = function (data, fixAppendName) {
    const axiosConfig = getAxiosConfig('DELETE', fixAppendName)
    if (data) axiosConfig.data = data
    return axios(axiosConfig)
  }

  // 添加
  const add = (data) => {
    return POST(data)
  }
  // 删除
  const remove = (data) => {
    return DELETE(data)
  }
  // 更新
  const update = (data) => {
    return PUT(data)
  }
  // 搜索
  const search = (params) => {
    return GET(params)
  }

  // 基本service
  const baseAction = {GET, POST, PUT, DELETE}
  // 通用service
  const defaultAction = {add, remove, update, search}
  return {base: baseAction, ...defaultAction}
}
