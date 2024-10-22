import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTaskTags, loadList } from "../../features/tasksSlice";
import { Form } from 'react-bootstrap'

const Addtags = ({currentTask}) => {
    const projectId = useSelector((state) => state.settings.value)
    const [tag, setTag] = useState('')
    const dispatch = useDispatch()
    const handleForm = (e) => {
        e.preventDefault()
        dispatch(addTaskTags({id: currentTask ,tags: tag}))
        dispatch(loadList({ id: projectId.currentProject }))
        setTag('')
    }

    return ( 
        <Form onSubmit={e => handleForm(e)}>
            <Form.Label>Add Tags</Form.Label>
            <input className="form-control" type='text' placeholder="enter tag" value={tag} onChange={e => setTag(e.target.value)}  />
        </Form>
     );
}
 
export default Addtags;