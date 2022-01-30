import React, { Component } from 'react'
import MoviesTable from './MoviesTable'
import Pagination from './common/Pagination'
import ListGroup from './common/ListGroup'
import FormInput from './common/FormInput'
import { paginate } from '../utils/paginate'
import { deleteMovie, getMovies } from '../services/movieService'
import { getGenres } from '../services/genreService'
import _ from 'lodash'
import { Outlet } from 'react-router-dom'

export default class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 5,
		currentPage: 1,
		selectedGenre: {},
		selectedSort: { column: '', order: '' },
		searchString: ''
	}
	componentDidMount = async () => {
		try {
			await this.fetchMovies()
			await this.fetchGenres()
		} catch (ex) {
			// console.log(ex)
		}
	}

	fetchMovies = async () => {
		const movies = await getMovies()
		this.setState({ movies: movies })
	}

	fetchGenres = async () => {
		const dbGenres = await getGenres()
		const genres = [{ name: 'All Genres', _id: '' }, ...dbGenres]
		this.setState({ genres })
	}

	onDeleteMovie = async (id) => {
		await deleteMovie(id)
		this.fetchMovies()
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page })
	}

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1, searchString: '' })
	}

	handleSort = (column) => {
		const { column: currentColumn, order: currentOrder } =
			this.state.selectedSort
		if (currentColumn === column) {
			const order = currentOrder === 'asc' ? 'desc' : 'asc'
			this.setState({ selectedSort: { column: currentColumn, order } })
		} else {
			this.setState({ selectedSort: { column, order: 'asc' } })
		}
	}

	getPagedData = () => {
		const {
			movies: allMovies,
			selectedGenre,
			pageSize,
			currentPage,
			searchString
		} = this.state

		let filteredMovies = allMovies

		if (searchString) {
			filteredMovies = allMovies.filter((movie) => {
				return movie.title.toLowerCase().startsWith(searchString.toLowerCase())
			})
		} else if (selectedGenre && selectedGenre._id) {
			filteredMovies = allMovies.filter(
				(movie) => movie.genre.name === selectedGenre.name
			)
		}

		filteredMovies.sort((a, b) => {
			let key = this.state.selectedSort.column
			const aSelector = _.get(a, key)
			const bSelector = _.get(b, key)
			const compareStatement =
				this.state.selectedSort.order === 'asc'
					? aSelector < bSelector
					: aSelector > bSelector

			return compareStatement ? -1 : 1
		})

		const movies = paginate(filteredMovies, currentPage, pageSize)
		return { genreMoviesCount: filteredMovies.length, movies }
	}

	handleMovieSearch = (e) => {
		this.setState({
			searchString: e.currentTarget.value,
			selectedGenre: {},
			currentPage: 1
		})
	}

	render() {
		const {
			movies: allMovies,
			genres,
			selectedGenre,
			pageSize,
			currentPage,
			selectedSort,
			searchString
		} = this.state

		const { genreMoviesCount, movies } = this.getPagedData()

		if (allMovies.length === 0) return <p>There are no movies to display.</p>
		return (
			<div className='row'>
				<Outlet />
				<div className='col-3'>
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>

				<div className='col mt-3'>
					<button
						type='button'
						className='btn btn-primary mb-4'
						onClick={() =>
							this.props.navigate('movies/new', { replace: true })
						}>
						New Movie
					</button>

					<p>There are {genreMoviesCount} movies in the database.</p>
					<FormInput
						type={'text'}
						name={'movie-search'}
						value={searchString}
						placeholder={'Search...'}
						onChange={this.handleMovieSearch}
					/>
					<MoviesTable
						movies={movies}
						deleteMovie={this.onDeleteMovie}
						onSort={this.handleSort}
						selectedSort={selectedSort}
					/>
					<Pagination
						itemsCount={genreMoviesCount}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		)
	}
}
