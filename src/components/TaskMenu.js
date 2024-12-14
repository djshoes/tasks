import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTrash, faThumbTack, faThumbtack } from '@fortawesome/free-solid-svg-icons'

import { useSelector, useDispatch } from 'react-redux'
//import { useEffect, useState } from 'react'
import styles from '../styles/taskMenu.module.scss'
import { toggleSidebarMenu, updateCurrentTaskId } from '../features/settingsSlice'

const TaskMenu = (props) => {
    const dispatch = useDispatch()
    const projectId = useSelector((state) => state.settings.value)
    //const [showMenu, setShowMenu] = useState(false)

    

    
    const handleMenu = (id) => {
        //showMenu ? setShowMenu(false) : setShowMenu(true)
        dispatch(toggleSidebarMenu())
        dispatch(updateCurrentTaskId({id: props.taskId}))
    }
    return ( 
        <div className='d-flex position-relative'>
            <span className={`${styles.pin} mx-3 ${props.pinned ? styles.pinned : ''}`} onClick={() => props.pin(props.taskId, !props.pinned)}><FontAwesomeIcon icon={faThumbtack} /></span>
            
            
            <span onClick={() => handleMenu(props.taskId)} className={`${styles.svg}`}><FontAwesomeIcon icon={faList} /></span>
            {/* <div className={`${styles.taskMenu} ${showMenu ? 'd-block' : 'd-none'}`}>
                <div className={styles.menuItem}><FontAwesomeIcon icon={faThumbTack} /> Pin</div>
            </div> */}
        </div>
     );
}
 
export default TaskMenu;