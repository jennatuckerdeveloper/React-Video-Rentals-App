import React, { useState, useEffect } from 'react'
import MoviesTable from './MoviesTable'
import Pagination from './common/Pagination'
import ListGroup from './common/ListGroup'
import FormInput from './common/FormInput'
import { useAuth } from '../hooks/useAuth'
import { filterDataByInput } from '../utils/filterDataByInput'
import { pagedData } from '../utils/pagedData'
import { deleteMovie, getMovies } from '../services/movieService'
import { getGenres } from '../services/genreService'

const Movies = ({ navigate }) => {
	const [movies, setMovies] = useState([])
	const [genres, setGenres] = useState([])
	const [pageSize] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedGenre, setSelectedGenre] = useState({})
	const [selectedSort, setSelectedSort] = useState({ column: '', order: '' })
	const [searchString, setSearchString] = useState('')

	let auth = useAuth()

	useEffect(() => {
		try {
			fetchMovies()
			fetchGenres()
		} catch (ex) {}
	}, [])

	const fetchMovies = async () => {
		const movies = await getMovies()
		setMovies(movies)
	}

	const fetchGenres = async () => {
		const dbGenres = await getGenres()
		const genres = [{ name: 'All Genres', _id: '' }, ...dbGenres]
		setGenres(genres)
	}

	const onDeleteMovie = async (id) => {
		await deleteMovie(id)
		fetchMovies()
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
	}

	const handleGenreSelect = (genre) => {
		setSelectedGenre(genre)
		setCurrentPage(1)
		setSearchString('')
	}

	const handleSort = (column) => {
		const { column: currentColumn, order: currentOrder } = selectedSort
		if (currentColumn === column) {
			const order = currentOrder === 'asc' ? 'desc' : 'asc'
			setSelectedSort({ column: currentColumn, order })
		} else {
			setSelectedSort({ column, order: 'asc' })
		}
	}

	const handleMovieSearch = (e) => {
		setSearchString(e.currentTarget.value)
		setSelectedGenre({})
		setCurrentPage(1)
	}

	const filterMoviesByGenreSelect = (genre) => (movies) => {
		if (genre && genre._id) {
			return movies.filter((movie) => movie.genre.name === genre.name)
		}
		return movies
	}

	const { filteredDataLength: genreMoviesCount, visibleData: moviesToShow } =
		pagedData(movies, currentPage, pageSize, selectedSort, [
			filterDataByInput(searchString, 'title'),
			filterMoviesByGenreSelect(selectedGenre)
		])

	return (
		<div className='row'>
			<div className='col-3'>
				<ListGroup
					items={genres}
					selectedItem={selectedGenre}
					onItemSelect={handleGenreSelect}
				/>
			</div>

			<div className='col mt-3'>
				{auth.user && auth.user.isAdmin && (
					<button
						type='button'
						className='btn btn-primary mb-4'
						onClick={() => navigate('movies/new', { replace: true })}>
						New Movie
					</button>
				)}

				<p>There are {genreMoviesCount} movies in the database.</p>
				<FormInput
					type={'text'}
					name={'movie-search'}
					value={searchString}
					placeholder={'Search...'}
					onChange={handleMovieSearch}
				/>
				<MoviesTable
					movies={moviesToShow}
					deleteMovie={onDeleteMovie}
					onSort={handleSort}
					selectedSort={selectedSort}
				/>
				<Pagination
					itemsCount={genreMoviesCount}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default Movies
