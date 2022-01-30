import devUrls from '../config/urls'
import { http } from './httpService'

const { movieUrl } = devUrls

const getMovieUrl = (id) => `${movieUrl}/${id}`

export const getMovies = async () => {
	const { data } = await http.get(movieUrl)
	return data
}

export const getMovie = async (movieId) => {
	const { data } = await http.get(getMovieUrl(movieId))
	return data
}

export const saveMovie = async (movie) => {
	if (!movie._id) {
		const { data } = await http.post(movieUrl, movie)
		return data
	} else {
		const movieData = { ...movie }
		delete movieData._id
		const { data } = await http.put(getMovieUrl(movie._id), movieData)
		return data
	}
}

export const deleteMovie = async (movieId) => {
	const { data } = await http.delete(getMovieUrl(movieId))
	return data
}
