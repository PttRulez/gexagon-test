import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Loader = () => {

  return (
    <div className='form-wrapper'>
    <FontAwesomeIcon icon={faSpinner} spin className='loader' size={'4x'} />
    </div>
  )
}


export default Loader