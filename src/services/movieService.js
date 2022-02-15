import { http } from './httpService'

const apiEndpoint = `/movies`

const getMovieUrl = (id) => `${apiEndpoint}/${id}`

export const getMovies = async () => {
	const { data } = await http.get(apiEndpoint)
	return data
}

export const getMovie = async (movieId) => {
	const { data } = await http.get(getMovieUrl(movieId))
	return data
}

export const saveMovie = async (movie) => {
	if (!movie._id) {
		const { data } = await http.post(apiEndpoint, movie)
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
