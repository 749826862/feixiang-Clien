import axios from '@/asset/js/axios'

export const login = (data) => axios.get(`/app/user/login`, {params: data})
