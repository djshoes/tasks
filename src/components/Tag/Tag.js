import { useDispatch, useSelector } from 'react-redux';
import styles from './tag.module.scss'
import { removeTag, loadList } from '../../features/tasksSlice';

const Tag = ({tag, taskid}) => {
    const dispatch = useDispatch()
    const projectId = useSelector((state) => state.settings.value)

    const handleRemoveTag = () => {
        dispatch(removeTag({ id: taskid, tag: tag }))
        dispatch(loadList({ id: projectId.currentProject }))
    }

    return ( 
        <span className={styles.tag}>
            {tag}
            <span onClick={() => handleRemoveTag()} className={styles.delete}>x</span>
        </span>
     );
}
 
export default Tag;