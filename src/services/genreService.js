import devUrls from '../config/urls'
import { http } from './httpService'

const { genreUrl } = devUrls

export const getGenres = async () => {
	const { data } = await http.get(genreUrl)
	return data
}
