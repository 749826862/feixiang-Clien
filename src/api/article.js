import axios, { Get } from '@/asset/js/axios'

const baseURL = '/pc/article'

//查询简历列表
export const QUERYLIST = (data = {}) => axios.get(`${baseURL}/list`, {...data})

//删除
export const delResume = (data = {}) => Get(`${baseURL}/del`, data)