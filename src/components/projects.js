import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid';
import {
    addProject, removeProject, closeProjectForm
} from '../features/projectsSlice'
import { setProjectId } from '../features/settingsSlice'
import { loadList, removeProjectTasks, addTask } from '../features/tasksSlice'
import { removeProjectNotes } from '../features/notesSlice'
import { loadNotes } from '../features/notesSlice'
import TopSection from './TopSection';
import Project from './Project';
import styles from '../styles/projects.module.scss';
import '../styles/projectTop.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export default function Projects() {
    let projects = useSelector((state) => state.projects.value)
    let templates = useSelector((state) => state.templates.projecttemplates)
    let openMobileAdd = useSelector((state) => state.projects.showAdd)

    let [showTemplates, setShowTemplates] = useState(false)

    const projectId = useSelector((state) => state.settings.value)
    const dispatch = useDispatch()

    const [pname, setpName] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = e => {
        e.preventDefault()
        setShow(true);
    }

    const modalExit = () => {
        let width = window.matchMedia('(max-width: 768px)');
        if(!width.matches) {
            document.getElementById('taskName').focus()
        }
        setShowTemplates(false)
    }

    const handleChange = e => {
        setpName(e.target.value)
    }

    const handleAddProject = async () => {
        let genId = uuid()
        
        dispatch(addProject({ id: genId, name: pname }))
        
        document.getElementById('myform').reset()
        dispatch(closeProjectForm())
        handleLoadList({id: genId})
        handleClose()
        return genId
    }

    const handleAddProjectFromTemplate = tasks => {
        handleAddProject().then(id => {
            tasks.forEach(task => {
                dispatch(addTask({ id: uuid(), projectId: id, name: task.name, done: false, time: new Date().toLocaleString() }))
            });
            dispatch(loadList({ id: id }))
        })
    }

    const handleLoadList = (project) => {
        dispatch(setProjectId(project))
        dispatch(loadList(project))
        dispatch(loadNotes(project))
        modalExit()
    }
    const remove = (project) => {
        let x = window.confirm('really delete?');
        if (x) {
            dispatch(removeProject(project))
            dispatch(removeProjectTasks(project))
            dispatch(removeProjectNotes(project))
        }
    }

    return (
        <div className={styles.projects + ' d-flex flex-md-column align-items-start'}>
            <TopSection
                formid='myform'
                handleAdd={handleShow}
                handleChange={handleChange}
                placeholder='Project name'
                id='projectTop'
                className={openMobileAdd ? 'open' : ''}
            >
                <div className='d-md-none' onClick={() => dispatch(closeProjectForm())}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </TopSection>
            
            <div className={`${styles.projectsContainer} d-flex d-md-block scrollbar w-100`}>
                {projects.map((project, i) => {
                    let active = false
                    project.id == projectId.currentProject ? active = true : null;
                    return (
                        <Project 
                            key={i} 
                            active={active} 
                            project={project}
                            handleLoadList={handleLoadList}
                            name={project.name}
                            remove={remove}
                        />
                    )
                })}
            </div>

            <Modal show={show} onHide={handleClose} restoreFocus={false} onExited={modalExit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`${showTemplates ? 'd-none' : 'd-flex'} justify-content-around`}>
                        <Button autoFocus className={styles.projectType} onClick={handleAddProject}>Blank</Button>
                        <Button className={styles.projectType} onClick={() => setShowTemplates(true)}>Use template</Button>
                    </div>
                    <div className={`${showTemplates ? '' : 'd-none'}`}>
                        <p>Choose a template</p>
                        <div className='d-flex justify-content-around flex-wrap'>
                            {templates ? templates.map((template, i) => {
                                return (
                                    <Button className={styles.projectType} onClick={() => handleAddProjectFromTemplate(template.tasks)} key={i}>{template.name}</Button>
                                )
                            }) : null}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}