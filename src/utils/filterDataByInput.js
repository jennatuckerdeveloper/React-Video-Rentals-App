export const filterDataByInput = (searchString, dataKey) => (data) => {
	if (searchString) {
		return data.filter((dataType) =>
			dataType[dataKey].toLowerCase().startsWith(searchString.toLowerCase())
		)
	}
	return data
}
