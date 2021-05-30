import axios, { Get } from '@/asset/js/axios'

const baseURL = '/pc/user'

//获取用户列表
export const GETUSERLIST = (data = {}) => Get(`${baseURL}/list`, data)

//删除
export const DELUSER = (data = {}) => axios.post(`${baseURL}/del`, {...data})

//创建
export const CREATE = (data = {}) => axios.post(`${baseURL}/create`, {...data})