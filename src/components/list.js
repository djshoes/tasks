import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid';
import {
    addTask, removeTask, done, load, loadList, pin
} from '../features/tasksSlice'
import TopSection from './TopSection';
import Task from './Task';

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
        dispatch(loadList({id: projectId.currentProject}))
    }

    

    const taskDone = (id, status) => {
        dispatch(done({ id: id, done: status }))
        dispatch(loadList({ id: projectId.currentProject }))
    }

    const taskPinned = (id, status) => {
        dispatch(pin({ id: id, pinned: status }))
        dispatch(loadList({ id: projectId.currentProject }))
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
            <div className='card scrollbar' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <div className='card-body'>
                    <ul className='pl-0'>
                        {tasks.map((item, i) => {
                            return (
                                <Task
                                    key={i}
                                    taskDone={taskDone}
                                    taskPinned={taskPinned}
                                    item={item}
                                />
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}