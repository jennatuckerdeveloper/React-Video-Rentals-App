import Table from './common/Table'
import DeleteButton from './DeleteButton'
import Like from './common/Like'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const MoviesTable = ({ movies, onSort, selectedSort, deleteMovie }) => {
	let auth = useAuth()
	const columns = [
		{
			value: 'title',
			label: 'Title',
			content: (movie) =>
				auth.user && auth.user.isAdmin ? (
					<Link to={movie._id}>{movie.title}</Link>
				) : (
					<span>{movie.title}</span>
				)
		},
		{ value: 'genre.name', label: 'Genre' },
		{ value: 'numberInStock', label: 'Stock' },
		{ value: 'dailyRentalRate', label: 'Rate' }
		// { key: 'like', content: () => <Like /> }
	]
	const authOnlyColumns = [
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
			columns={
				auth.user && auth.user.isAdmin
					? columns.concat(authOnlyColumns)
					: columns
			}
			selectedSort={selectedSort}
			onSort={onSort}
		/>
	)
}

export default MoviesTable
