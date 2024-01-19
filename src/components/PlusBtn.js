import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/plusBtn.module.scss'

const PlusBtn = props => {
    return ( 
        <button onClick={props.action} className={styles.plusBtn +' card my-2 ' + props.class}>
            <FontAwesomeIcon icon={faPlus} />
        </button>
     );
}
 
export default PlusBtn;