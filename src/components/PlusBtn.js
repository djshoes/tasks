import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/plusBtn.module.scss'
import { openProjectForm } from '../features/projectsSlice'
import { useDispatch } from 'react-redux'

const PlusBtn = props => {
    const dispatch = useDispatch()

    const handleOpenProjectForm = () => {
        dispatch(openProjectForm())
    }
    return ( 
        <button onClick={handleOpenProjectForm} className={styles.plusBtn +' card d-md-none py-2'}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
     );
}
 
export default PlusBtn;