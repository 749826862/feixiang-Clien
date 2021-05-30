import axios from 'axios'
import { HashRouter } from 'react-router-dom'
import { message } from 'antd'
import { getCookie, removeCookie } from '@/asset/js/util'

const router = new HashRouter()

const instance = axios.create({
	baseURL: 'http://127.0.0.1:7001',
	timeout: 10000,

})

//设置token
function getToken() {
	let token = getCookie('token')
	return token ? token : ''
}


//请求拦截器
instance.interceptors.request.use(config => {
	// console.log(config, '来自请求拦截器')
	config.headers['authorization'] = getToken()
	return config
}, error => {
	return Promise.reject(error);
})


// 响应拦截器
instance.interceptors.response.use(config => {
	// console.log(config, '来自响应拦截器')
	return config.data
}, error => {
	if (error.response) {
		switch (error.response.status) {
			case 400:
				console.log(error.response, 888)
				// 返回 401 清除token信息并跳转到登录页面
				// store.commit(types.LOGOUT);
				// router.history.replace({
				// 	path: 'login',
				// 	query: { redirect: router.currentRoute.fullPath }
				// })
				message.error(error.response.data.message)
				removeCookie('token')
				router.history.replace('/login')
			break;
			default:
				console.log('没事')
		}
	}
	return Promise.reject(error.response.data)   // 返回接口返回的错误信息
})

export const Get = (url, data) => {
	return instance.get(url, {params: data})
}

export default instance