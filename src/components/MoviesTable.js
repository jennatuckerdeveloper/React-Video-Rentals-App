import Table from './common/Table'
import DeleteButton from './DeleteButton'
import Like from './common/Like'

const MoviesTable = ({ movies, onSort, selectedSort }) => {
	const columns = [
		{ value: 'title', label: 'Title' },
		{ value: 'genre.name', label: 'Genre' },
		{ value: 'numberInStock', label: 'Stock' },
		{ value: 'dailyRentalRate', label: 'Rate' },
		{ key: 'like', content: () => <Like /> },
		{
			key: 'delete',
			content: (movie) => (
				<DeleteButton
					onClick={() => {
						this.props.deleteMovie(movie._id)
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
