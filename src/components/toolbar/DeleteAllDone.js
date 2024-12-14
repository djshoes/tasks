import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllDone } from "../../features/tasksSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons'

const DeleteAllDone = () => {
    let dispatch = useDispatch()
    let currentProject = useSelector(state => state.settings.value)

    const handleDeleteAll = () => {
        let c = window.confirm('Are you sure you want to delete all done tasks in current project?')

        if(c) {
            dispatch(deleteAllDone({currentProject: currentProject.currentProject}))
        }
    }

    return ( 
        <Button className="text-warning" onClick={() => handleDeleteAll()}>
            <FontAwesomeIcon icon={faTrashCanArrowUp} />
        </Button>
     );
}
 
export default DeleteAllDone;