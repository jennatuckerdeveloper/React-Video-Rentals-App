import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as Heart } from '@fortawesome/free-regular-svg-icons'

const Like = ({ liked, toggleLiked }) => {
	return (
		<FontAwesomeIcon icon={liked ? faHeart : Heart} onClick={toggleLiked} />
	)
}

export default Like
