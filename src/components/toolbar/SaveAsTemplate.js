import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector, useDispatch } from 'react-redux'
import { saveTemplate } from '../../features/templatesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

function SaveAsTemplate() {
    const tasks = useSelector((state) => state.tasks.value)
    const dispatch = useDispatch()

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');

    const handleClose = () => {
        setShow(false);
        setName('')
    }
        
    const handleShow = () => setShow(true);

    const handleTemplateAdd = e => {
        e.preventDefault()
        dispatch(saveTemplate({template: {name: name, tasks: tasks}}))
        handleClose()
    }

    const handleChange = e => {
        setName(e.target.value)
    }

    return (
        <>
            <Button className='text-info' variant="primary" onClick={handleShow}>
                <FontAwesomeIcon icon={faFloppyDisk} />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Save template</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id='addTemplateForm' onSubmit={handleTemplateAdd} className='my-3 w-100'>
                        <div className='input-group'>
                            <input autoFocus className='form-control' required type='text' placeholder='Template name' onChange={handleChange} value={name} />
                            <div className='input-group-append'>
                                <button className='btn btn-primary' type='submit'>Add</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SaveAsTemplate;