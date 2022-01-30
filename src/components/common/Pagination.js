import PropTypes from 'prop-types'

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
	const pagesCount = Math.ceil(itemsCount / pageSize)
	if (pagesCount === 1) return null
	const pages = [...Array(pagesCount).keys()].map((n) => n + 1)
	return (
		<nav aria-label='Page navigation example'>
			<ul className='pagination'>
				{pages.map((page) => (
					<li
						key={page}
						className={page === currentPage ? 'page-item active' : 'page-item'}
						onClick={() => onPageChange(page)}>
						<div className='page-link'>{page}</div>
					</li>
				))}
			</ul>
		</nav>
	)
}

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired
}

export default Pagination
