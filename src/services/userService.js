import { http } from './httpService'

const apiEndpoint = `/users`

export const newUser = (user) => {
	return http.post(apiEndpoint, user)
}
