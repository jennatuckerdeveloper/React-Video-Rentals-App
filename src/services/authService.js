import { apiUrl } from '../config/urls'
import { http } from './httpService'
import jwt_decode from 'jwt-decode'

const apiEndpoint = `${apiUrl}/auth`
const tokenKey = 'token'

const login = async ({ email, password }, callback) => {
	const { data: jwt } = await http.post(apiEndpoint, { email, password })
	localStorage.setItem(tokenKey, jwt)
	callback()
}

const loginWithJwt = (jwt) => {
	localStorage.setItem(tokenKey, jwt)
}

const logout = () => {
	localStorage.removeItem(tokenKey)
}

const getCurrentUser = () => {
	try {
		const jwt = localStorage.getItem(tokenKey)
		return jwt_decode(jwt)
	} catch (err) {}
}

const getJwt = () => {
	return localStorage.getItem(tokenKey)
}

http.setJwt(getJwt())

const auth = {
	login,
	loginWithJwt,
	logout,
	getCurrentUser,
	getJwt
}

export default auth
