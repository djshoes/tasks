import { removeTask } from '../../features/tasksSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebarMenu } from '../../features/settingsSlice'
import styles from './DeleteTask.module.scss'

const DeleteTask = ({currentTask}) => {
    const dispatch = useDispatch()
    const projectId = useSelector((state) => state.settings.value)
    const removeThisTask = () => {
            let x = window.confirm('really delete?');
            if (x) {
                dispatch(removeTask({ id: currentTask, currentProject: projectId.currentProject }))
                dispatch(toggleSidebarMenu())
            }
        }

    return ( 
        <>
            <div onClick={() => removeThisTask()} className={`${styles.btn} mt-auto border rounded p-2 bg-danger text-center`}>
                <span className='text-white mr-3'><FontAwesomeIcon icon={faTrash} /></span>
                <span>DELETE</span>
            </div>
        </>
     );
}
 
export default DeleteTask;