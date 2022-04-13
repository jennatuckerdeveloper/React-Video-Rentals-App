import Table from './common/Table'
import ActionButton from './ActionButton'
import DeleteButton from './DeleteButton'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import GoldMemberIcon from './GoldMemberIcon'
import { useNavigate } from 'react-router-dom'

const CustomersTable = ({
	Customers,
	onSort,
	selectedSort,
	deleteCustomer
}) => {
	let auth = useAuth()
	const navigate = useNavigate()
	const columns = [
		{
			value: 'name',
			label: 'Name',
			content: (customer) => (
				<Link to={`/rentals/${customer._id}`}>{customer.name}</Link>
			)
		},
		{ value: 'phone', label: 'Phone' },
		{
			key: 'isGold',
			value: 'isGold',
			label: 'Gold Member',
			content: (customer) => {
				return customer.isGold ? <GoldMemberIcon /> : null
			}
		}
	]
	const authOnlyColumns = [
		{
			key: 'update',
			content: (customer) => (
				<ActionButton
					label={'Update'}
					onClick={() => {
						navigate(`/customers/${customer._id}`)
					}}
				/>
			)
		},
		{
			key: 'delete',
			content: (customer) => (
				<DeleteButton
					onClick={() => {
						deleteCustomer(customer._id)
					}}
				/>
			)
		}
	]
	return (
		<Table
			data={Customers}
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

export default CustomersTable
