import GoldMemberIcon from './GoldMemberIcon'
import ActionButton from './ActionButton'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const DisplayCustomer = ({ customer }) => {
	const navigate = useNavigate()
	const auth = useAuth()
	return (
		<div className='card mb-2'>
			<h5 className='card-header'>Customer:</h5>
			<div className='card-body'>
				<h6 className='card-title mb-2'>{customer.name}</h6>
				<h6 className='card-subtitle mb-2 '>{customer.phone}</h6>
				<p className='card-text'>
					{customer.isGold ? <GoldMemberIcon /> : null}
				</p>
				{auth.isAdmin && (
					<ActionButton
						label={'Update'}
						onClick={() => {
							navigate(`/customers/${customer._id}`)
						}}
					/>
				)}
			</div>
		</div>
	)
}

export default DisplayCustomer
