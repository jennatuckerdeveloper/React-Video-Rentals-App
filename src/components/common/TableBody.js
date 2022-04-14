import _ from 'lodash'
const TableBody = ({ columns, data }) => {
	const renderCell = (item, column) => {
		if (column.content) return column.content(item)
		return _.startCase(_.toLower(_.get(item, column.value)))
	}
	return (
		<tbody>
			{data.map((item, i) => (
				<tr key={i}>
					{columns.map((column, i) => (
						<td key={i}>{renderCell(item, column)}</td>
					))}
				</tr>
			))}
		</tbody>
	)
}

export default TableBody
