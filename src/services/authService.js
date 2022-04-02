import { http } from './httpService'
import jwt_decode from 'jwt-decode'

const apiEndpoint = `/auth`
const tokenKey = 'token'

const login = async ({ email, password }, callback) => {
	const { data: jwt } = await http.post(apiEndpoint, { email, password })
	localStorage.setItem(tokenKey, jwt)
	callback()
	http.setJwt(getJwt())
}

const loginWithJwt = (jwt, callback) => {
	localStorage.setItem(tokenKey, jwt)
	callback()
	http.setJwt(getJwt())
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
