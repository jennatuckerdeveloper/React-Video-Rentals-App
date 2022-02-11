import { apiUrl } from '../config/urls'
import { http } from './httpService'

const apiEndpoint = `${apiUrl}/users`

export const newUser = (user) => {
	return http.post(apiEndpoint, user)
}
