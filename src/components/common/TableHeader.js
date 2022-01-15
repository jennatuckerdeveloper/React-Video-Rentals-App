import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const TableHeader = ({ columns, selectedSort, onSort }) => {
	const renderSortIcon = (column) => {
		if (column.value === selectedSort.column) {
			const sortArrow =
				selectedSort.order === 'asc' ? (
					<FontAwesomeIcon icon={faCaretUp} />
				) : (
					<FontAwesomeIcon icon={faCaretDown} />
				)
			return sortArrow
		}
	}

	return (
		<thead>
			<tr>
				{columns.map(({ value, label, key }) => (
					<th
						key={value ? value : key}
						scope='col'
						onClick={() => onSort(value)}>
						{label} {renderSortIcon({ value, label, key })}
					</th>
				))}
			</tr>
		</thead>
	)
}

export default TableHeader
