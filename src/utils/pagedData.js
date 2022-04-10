import { paginate } from '../utils/paginate'
import { sortUtil } from '../utils/sort'

export const pagedData = (
	data,
	currentPage,
	pageSize,
	selectedSort,
	filters
) => {
	for (let filter of filters) {
		data = filter(data)
	}

	if (selectedSort) {
		data.sort(sortUtil(selectedSort.column, selectedSort.order))
	}

	const filteredDataLength = data.length

	const visibleData = paginate(data, currentPage, pageSize)

	return { filteredDataLength, visibleData }
}
