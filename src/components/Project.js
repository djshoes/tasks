import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/project.module.scss'

const Project = (props) => {
    return ( 
        <div onClick={() => props.handleLoadList(props.project)} className={`card my-2 ${styles.project} project mx-2 ${props.active ? 'active' : ''}`}>
            <div className='card-body d-flex'>
                {props.name}
                <div className='ml-2 ml-md-auto'><span onClick={() => props.remove(props.project)}><FontAwesomeIcon icon={faTrash} /></span></div>
            </div>
        </div>
     );
}
 
export default Project;