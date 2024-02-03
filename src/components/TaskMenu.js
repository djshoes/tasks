import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTrash, faThumbTack, faThumbtack } from '@fortawesome/free-solid-svg-icons'
import {
    addTask, removeTask, done, load, loadList, pin
} from '../features/tasksSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from '../styles/taskMenu.module.scss'

const TaskMenu = (props) => {
    const dispatch = useDispatch()
    const projectId = useSelector((state) => state.settings.value)
    const [showMenu, setShowMenu] = useState(false)

    const removeThisTask = (id) => {
        let x = window.confirm('really delete?');
        if (x) {
            dispatch(removeTask(id))
            dispatch(loadList({ id: projectId.currentProject }))
        }
    }

    
    // const handleMenu = () => {
    //     showMenu ? setShowMenu(false) : setShowMenu(true)
    // }
    return ( 
        <div className='d-flex position-relative'>
            <span className={`${styles.pin} mx-3 ${props.pinned ? styles.pinned : ''}`} onClick={() => props.pin(props.taskId, !props.pinned)}><FontAwesomeIcon icon={faThumbtack} /></span>
            <span className='text-danger' onClick={() => removeThisTask(props.taskId)}><FontAwesomeIcon icon={faTrash} /></span>
            
            {/* <span onClick={handleMenu} className={`ml-3 ${styles.svg}`}><FontAwesomeIcon icon={faList} /></span> */}
            {/* <div className={`${styles.taskMenu} ${showMenu ? 'd-block' : 'd-none'}`}>
                <div className={styles.menuItem}><FontAwesomeIcon icon={faThumbTack} /> Pin</div>
            </div> */}
        </div>
     );
}
 
export default TaskMenu;