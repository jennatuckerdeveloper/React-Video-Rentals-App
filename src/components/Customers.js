import React, { useState, useEffect } from 'react'
import CustomersTable from './CustomersTable'
import Pagination from './common/Pagination'
import FormInput from './common/FormInput'
import { useAuth } from '../hooks/useAuth'
import { paginate } from '../utils/paginate'
import { getCustomers, deleteCustomer } from '../services/customerService'
import _ from 'lodash'

const Customers = ({ navigate }) => {
	const [customers, setCustomers] = useState([])
	const [pageSize] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedSort, setSelectedSort] = useState({ column: '', order: '' })
	const [searchString, setSearchString] = useState('')

	let auth = useAuth()

	useEffect(() => {
		try {
			fetchCustomers()
		} catch (ex) {}
	}, [])

	const fetchCustomers = async () => {
		const customers = await getCustomers()
		setCustomers(customers)
	}

	const handlePageChange = (page) => {
		setCurrentPage(page)
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

	const getPagedData = () => {
		const allCustomers = customers
		let filteredCustomers = allCustomers

		if (searchString) {
			filteredCustomers = allCustomers.filter((customer) => {
				return customer.name
					.toLowerCase()
					.startsWith(searchString.toLowerCase())
			})
		}

		filteredCustomers.sort((a, b) => {
			let key = selectedSort.column
			const aSelector = _.get(a, key)
			const bSelector = _.get(b, key)
			const compareStatement =
				selectedSort.order === 'asc'
					? aSelector < bSelector
					: aSelector > bSelector

			return compareStatement ? -1 : 1
		})

		const CustomersToShow = paginate(filteredCustomers, currentPage, pageSize)
		return { customersCount: filteredCustomers.length, CustomersToShow }
	}

	const handleCustomerSearch = (e) => {
		setSearchString(e.currentTarget.value)
		setCurrentPage(1)
	}

	const onDeleteCustomer = async (id) => {
		await deleteCustomer(id)
		fetchCustomers()
	}

	const { customersCount, CustomersToShow } = getPagedData()

	return (
		<div className='row'>
			<div className='col mt-3'>
				{auth.user && auth.user.isAdmin && (
					<button
						type='button'
						className='btn btn-primary mb-4'
						onClick={() => navigate('Customers/new', { replace: true })}>
						New customer
					</button>
				)}

				<p>There are {customersCount} Customers in the database.</p>
				<FormInput
					type={'text'}
					name={'customer-search'}
					value={searchString}
					placeholder={'Search...'}
					onChange={handleCustomerSearch}
				/>
				<CustomersTable
					Customers={CustomersToShow}
					deleteCustomer={onDeleteCustomer}
					onSort={handleSort}
					selectedSort={selectedSort}
				/>
				<Pagination
					itemsCount={customersCount}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default Customers
