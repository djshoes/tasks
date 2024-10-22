import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.scss'

const ProgressBar = props => {
    const [barPercent, setBarPercent] = useState(0)

    useEffect(() => {
        let tasksDone = props.tasks.filter(task => task.done === true).length
        let totalTasks = props.tasks.length

        let percentDone = (100 / totalTasks) * tasksDone
        setBarPercent(percentDone)
    }, [props.tasks])
    return ( 
        <div className={`${styles.ProgressBar}`}>
            <div style={{width: `${barPercent}%`}}></div>
        </div>
     );
}
 
export default ProgressBar;