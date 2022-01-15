export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize
	const endIndex = startIndex + pageSize
	const pageItems = items.slice(startIndex, endIndex)
	return pageItems
}
