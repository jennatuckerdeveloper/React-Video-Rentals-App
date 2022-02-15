import { http } from './httpService'

const apiEndpoint = `/genres`

export const getGenres = async () => {
	const { data } = await http.get(apiEndpoint)
	return data
}
