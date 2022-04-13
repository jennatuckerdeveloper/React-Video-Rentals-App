import React, { useState, useEffect } from 'react'
import RentalsTable from './RentalsTable'
import Pagination from './common/Pagination'
import FormInput from './common/FormInput'
import { pagedData } from '../utils/pagedData'
import { filterDataByInput } from '../utils/filterDataByInput'
import { getRentals } from '../services/rentalService'
import { checkInRental } from '../services/returnService'

const Rentals = ({ navigate }) => {
	const [rentals, setRentals] = useState([])
	const [pageSize] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedSort, setSelectedSort] = useState({
		column: 'dateOut',
		order: 'desc'
	})
	const [searchString, setSearchString] = useState('')

	useEffect(() => {
		try {
			fetchRentals()
		} catch (ex) {}
	}, [])

	const fetchRentals = async () => {
		const rentals = await getRentals()
		setRentals(rentals)
	}

	const onCheckInRental = async (rental) => {
		await checkInRental(rental)
		fetchRentals()
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

	const handleRentalSearch = (e) => {
		setSearchString(e.currentTarget.value)
		setCurrentPage(1)
	}

	const { filteredDataLength: rentalsCount, visibleData: rentalsToShow } =
		pagedData(rentals, currentPage, pageSize, selectedSort, [
			filterDataByInput(searchString, 'customer.name')
		])

	console.log(rentals)
	console.log(selectedSort.column)
	return (
		<div className='row'>
			<div className='col mt-3'>
				<button
					type='button'
					className='btn btn-primary mb-4'
					onClick={() => navigate('rentals/new', { replace: true })}>
					New rental
				</button>
				<p>There are {rentalsCount} Rentals in the database.</p>
				<FormInput
					type={'text'}
					name={'customer-search'}
					value={searchString}
					placeholder={'Search by customer...'}
					onChange={handleRentalSearch}
				/>
				<RentalsTable
					rentals={rentalsToShow}
					onCheckInRental={onCheckInRental}
					onSort={handleSort}
					selectedSort={selectedSort}
					checkInRental={onCheckInRental}
				/>
				<Pagination
					itemsCount={rentalsCount}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default Rentals
