import { useDispatch, useSelector } from 'react-redux';
import styles from './sidebarMenu.module.scss'
import Addtags from '../AddTags/Addtags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toggleSidebarMenu } from '../../features/settingsSlice';
import Backdrop from '../Backdrop/Backdrop';

const SidebarMenu = () => {
    const sidebarOpen = useSelector(state => state.settings.sidebarMenuOpen)
    const currentTaskId = useSelector(state => state.settings.currentTaskId)
    const dispatch = useDispatch()
    return ( 
        <>
        <Backdrop show={sidebarOpen} />
        <div className={`${styles.sidebar} ${sidebarOpen ? 'right-zero' : ''}`}>
            <FontAwesomeIcon className={styles.close} onClick={() => dispatch(toggleSidebarMenu())} icon={faTimesCircle} />
            {currentTaskId ? <small className={styles.small}>{currentTaskId}</small> : ''}
            <Addtags currentTask={currentTaskId} />
        </div>
        </>
     );
} 
 
export default SidebarMenu;