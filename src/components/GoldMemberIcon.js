import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

const GoldMemberIcon = () => {
	return (
		<div>
			<FontAwesomeIcon icon={faCrown} className='' />
			<FontAwesomeIcon icon={faCrown} className='ml-2' />
			<FontAwesomeIcon icon={faCrown} className='ml-2' />
		</div>
	)
}

export default GoldMemberIcon
