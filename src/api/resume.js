import axios, { Get } from '@/asset/js/axios'

const baseURL = '/pc/resume'

//创建简历
export const create = (data = {}) => axios.post(`${baseURL}/create`, {...data})

//查询简历列表
export const queryList = (data = {}) => axios.get(`${baseURL}/list`, {...data})

//删除
export const delResume = (data = {}) => Get(`${baseURL}/del`, data)