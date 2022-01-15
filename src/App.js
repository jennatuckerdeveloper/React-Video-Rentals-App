import React from 'react'
import './App.css'
import { deleteMovie, getMovies } from './services/fakeMovieService'
import { getGenres } from './services/fakeGenreService'
import MoviesTable from './components/MoviesTable'
import Pagination from './components/common/Pagination'
import ListGroup from './components/common/ListGroup'
import { paginate } from './utils/paginate'
import _ from 'lodash'

class App extends React.Component {
	state = {
		movies: [],
		pageSize: 5,
		currentPage: 1,
		selectedGenre: {},
		selectedSort: { column: '', order: '' }
	}
	componentDidMount = () => {
		this.fetchMovies()
		this.fetchGenres()
	}

	fetchMovies = () => {
		const movies = getMovies()
		this.setState({ movies })
	}

	fetchGenres = () => {
		const genres = [{ name: 'All Genres', _id: '' }, ...getGenres()]
		this.setState({ genres })
	}

	onDeleteMovie = (id) => {
		deleteMovie(id)
		this.fetchMovies()
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page })
	}

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 })
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
			currentPage
		} = this.state

		const genreMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter((movie) => movie.genre.name === selectedGenre.name)
				: allMovies

		genreMovies.sort((a, b) => {
			let key = this.state.selectedSort.column
			const aSelector = _.get(a, key)
			const bSelector = _.get(b, key)
			const compareStatement =
				this.state.selectedSort.order === 'asc'
					? aSelector < bSelector
					: aSelector > bSelector

			return compareStatement ? -1 : 1
		})

		const movies = paginate(genreMovies, currentPage, pageSize)
		return { genreMoviesCount: genreMovies.length, movies }
	}

	render() {
		const {
			movies: allMovies,
			genres,
			selectedGenre,
			pageSize,
			currentPage,
			selectedSort
		} = this.state

		const { genreMoviesCount, movies } = this.getPagedData()

		if (allMovies.length === 0) return <p>There are no movies to display.</p>

		return (
			<main className='container'>
				<div className='row'>
					<div className='col-3'>
						<ListGroup
							items={genres}
							selectedItem={selectedGenre}
							onItemSelect={this.handleGenreSelect}
						/>
					</div>
					<div className='col'>
						<p>There are {genreMoviesCount} movies in the database.</p>
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
			</main>
		)
	}
}

export default App
