import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid';
import {
    addTask, done, pin
} from '../features/tasksSlice'
import TopSection from './TopSection';
import Task from './Task';
import styles from '../styles/List.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap';
import ProgressBar from './ProgressBar/ProgressBar';

export default function List() {
    const tasks = useSelector((state) => state.tasks.value)
    const projectId = useSelector((state) => state.settings.value)
    const dispatch = useDispatch()

    const [taskVal, setTaskVal] = useState('')

    const handleChange = e => {
        setTaskVal(e.target.value)
    }

    const handleAddTask = (e) => {
        e.preventDefault()

        dispatch(addTask({ id: uuid(), projectId: projectId.currentProject, name: taskVal, done: false, time: new Date().toLocaleString(), pinned: false }))
        document.getElementById('addform').reset()
    }

    

    const taskDone = (id, status) => {
        dispatch(done({ id: id, done: status, projectId: projectId.currentProject }))
    }

    const taskPinned = (id, status) => {
        dispatch(pin({ id: id, pinned: status, projectId: projectId.currentProject }))
    }

    return (
        <div id='list' className='d-flex flex-column align-items-center'>
            <TopSection 
                formid='addform' 
                handleAdd={handleAddTask} 
                handleChange={handleChange}
                placeholder='Add Task - [press ⏎ to add]'
                inputid='taskName'
            />
            <div className='d-flex align-items-center w-100'>
                <p style={{minWidth: '200px'}} className='mr-auto mb-1'>{tasks.filter(task => task.done === true).length} out of {tasks.length} tasks done</p>
                <ProgressBar tasks={tasks} />
            </div>
            <Card className={`${styles.listContainer} scrollbar`}>
            { tasks.some(task => task.pinned === true) ? 
                <Card className={`${styles.pinned}`}>
                    <div className={styles.pinLogo}><FontAwesomeIcon icon={faThumbtack} /></div>
                    <Card.Body>
                        <ul className='pl-0'>
                            {tasks.map((item, i) => {
                                if (item.pinned === true) {
                                    return (
                                        <Task
                                            key={i}
                                            taskDone={taskDone}
                                            taskPinned={taskPinned}
                                            item={item}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </Card.Body>
                </Card>
                : null }
                <Card>
                    <Card.Body>
                        <ul className='pl-0'>
                            {tasks.map((item, i) => {
                                if (item.pinned !== true) {
                                    return (
                                        <Task
                                            key={i}
                                            taskDone={taskDone}
                                            taskPinned={taskPinned}
                                            item={item}
                                        />
                                    )
                                }
                            })}
                        </ul>
                    </Card.Body>
                </Card>
            </Card>
            
        </div>
    )
}