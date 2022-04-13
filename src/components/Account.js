import React, { useState, useEffect } from 'react'
import { myAccount } from '../services/userService'
import CheckIcon from './CheckIcon'
const Account = () => {
	const [account, setAccount] = useState({})

	useEffect(() => {
		try {
			fetchMyAccount()
		} catch (ex) {}
	}, [])

	const fetchMyAccount = async () => {
		const account = await myAccount()
		setAccount(account)
	}
	return (
		<div className='card mb-2'>
			<h5 className='card-header'>Account:</h5>
			<div className='card-body'>
				<h6 className='card-title mb-3'>Username: {account.email}</h6>
				<h6 className='card-subtitle mb-3'>Name: {account.name}</h6>
				{account.isAdmin && (
					<h6 className='card-subtitle mb-3 d-flex'>
						<span className='mr-1'>
							<CheckIcon />
						</span>
						<span>Admin Status</span>
					</h6>
				)}
				{account.email && !account.isAdmin && (
					<span className='font-italic'>
						This user does not have admin status.
					</span>
				)}
			</div>
		</div>
	)
}

export default Account
