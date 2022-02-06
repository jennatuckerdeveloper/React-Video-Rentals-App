import { apiUrl } from '../config/urls'
import { http } from './httpService'

const apiEndpoint = `${apiUrl}/genres`

export const getGenres = async () => {
	const { data } = await http.get(apiEndpoint)
	return data
}
