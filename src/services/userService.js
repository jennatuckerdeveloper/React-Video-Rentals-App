import { http } from './httpService'

const apiEndpoint = `/users`
const myAccountEndpoint = '/my-account'

export const newUser = (user) => {
	return http.post(apiEndpoint, user)
}

export const myAccount = async () => {
	const { data } = await http.get(apiEndpoint + myAccountEndpoint)
	return data
}
