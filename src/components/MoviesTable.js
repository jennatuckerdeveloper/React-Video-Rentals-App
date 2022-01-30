import Table from './common/Table'
import DeleteButton from './DeleteButton'
import Like from './common/Like'
import { Link } from 'react-router-dom'

const MoviesTable = ({ movies, onSort, selectedSort, deleteMovie }) => {
	const columns = [
		{
			value: 'title',
			label: 'Title',
			content: (movie) => <Link to={movie._id}>{movie.title}</Link>
		},
		{ value: 'genre.name', label: 'Genre' },
		{ value: 'numberInStock', label: 'Stock' },
		{ value: 'dailyRentalRate', label: 'Rate' },
		{ key: 'like', content: () => <Like /> },
		{
			key: 'delete',
			content: (movie) => (
				<DeleteButton
					onClick={() => {
						deleteMovie(movie._id)
					}}
				/>
			)
		}
	]
	return (
		<Table
			data={movies}
			columns={columns}
			selectedSort={selectedSort}
			onSort={onSort}
		/>
	)
}

export default MoviesTable
