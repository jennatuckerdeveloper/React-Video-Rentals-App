import React, { useState, useEffect } from 'react'
import CustomersTable from './CustomersTable'
import Pagination from './common/Pagination'
import FormInput from './common/FormInput'
import { useAuth } from '../hooks/useAuth'
import { pagedData } from '../utils/pagedData'
import { filterDataByInput } from '../utils/filterDataByInput'
import { getCustomers, deleteCustomer } from '../services/customerService'

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

	const handleCustomerSearch = (e) => {
		setSearchString(e.currentTarget.value)
		setCurrentPage(1)
	}

	const onDeleteCustomer = async (id) => {
		await deleteCustomer(id)
		fetchCustomers()
	}

	const { filteredDataLength: customersCount, visibleData: customersToShow } =
		pagedData(customers, currentPage, pageSize, selectedSort, [
			filterDataByInput(searchString, 'name')
		])

	return (
		<div className='row'>
			<div className='col mt-3'>
				{auth.user && auth.user.isAdmin && (
					<button
						type='button'
						className='btn btn-primary mb-4'
						onClick={() => navigate('customers/new', { replace: true })}>
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
					Customers={customersToShow}
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
