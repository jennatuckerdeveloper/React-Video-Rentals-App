import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import logger from './logService'
import jwtDecode, { jwt_decode } from 'jwt-decode'

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	function (error) {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status < 500
		) {
			const statusText = error.response.statusText

			toast.error(`Error ${error.response.status} - ${statusText}`)
		} else {
			toast.error(`Unexpected error occured!`)
			logger.log(error)
		}
		return Promise.reject(error)
	}
)

const setJwt = (jwt) => {
	axios.defaults.headers.common['x-auth-token'] = jwt
}

export const http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt
}
