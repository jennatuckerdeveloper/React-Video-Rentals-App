import Table from './common/Table'
import ActionButton from './ActionButton'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import GoldMemberIcon from './GoldMemberIcon'

const RentalsTable = ({ rentals, onSort, selectedSort, checkInRental }) => {
	let auth = useAuth()
	const columns = [
		{
			value: 'customer',
			label: 'Customer',
			content: (rental) => (
				<Link to={rental.customer._id}>{rental.customer.name}</Link>
			)
		},
		{ value: 'customer.phone', label: 'Phone' },
		{
			key: 'isGold',
			value: 'customer.isGold',
			label: 'Gold Member',
			content: (rental) => {
				return rental.customer.isGold ? <GoldMemberIcon /> : null
			}
		},
		{ value: 'movie.title', label: 'Movie' },
		{
			value: 'dateOut',
			label: 'Date Out',
			content: (rental) => {
				return <span>{new Date(rental.dateOut).toDateString()}</span>
			}
		},
		{
			value: 'dateReturned',
			label: 'Returned',
			content: (rental) => {
				return rental.dateReturned ? (
					<span>{new Date(rental.dateReturned).toDateString()}</span>
				) : (
					<span className='font-italic'>still out</span>
				)
			}
		},
		{
			key: 'checkIn',
			content: (rental) => {
				return !rental.dateReturned ? (
					<ActionButton
						label={'Check In'}
						onClick={() => {
							checkInRental({
								customerId: rental.customer._id,
								movieId: rental.movie._id
							})
						}}
					/>
				) : null
			}
		}
	]
	const authOnlyColumns = []
	return (
		<Table
			data={rentals}
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

export default RentalsTable
