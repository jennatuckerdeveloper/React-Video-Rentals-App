import _ from 'lodash'
const ListGroup = ({
	items,
	selectedItem,
	textProperty,
	valueProperty,
	onItemSelect
}) => {
	return (
		<ul className='list-group'>
			{items.map((item) => (
				<li
					key={item[valueProperty]}
					className={
						item === selectedItem ? 'list-group-item active' : 'list-group-item'
					}
					onClick={() => onItemSelect(item)}>
					{_.startCase(_.toLower(item[textProperty]))}
				</li>
			))}
		</ul>
	)
}

ListGroup.defaultProps = {
	textProperty: 'name',
	valueProperty: '_id'
}

export default ListGroup
