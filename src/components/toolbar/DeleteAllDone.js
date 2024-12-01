import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllDone, loadList } from "../../features/tasksSlice";

const DeleteAllDone = () => {
    let dispatch = useDispatch()
    let currentProject = useSelector(state => state.settings.value)

    const handleDeleteAll = () => {
        let c = window.confirm('Are you sure you want to delete all done tasks in current project?')

        if(c) {
            dispatch(deleteAllDone({currentProject: currentProject.currentProject}))
            dispatch(loadList({ id: currentProject.currentProject }))
        }
    }

    return ( 
        <Button onClick={() => handleDeleteAll()}>trash</Button>
     );
}
 
export default DeleteAllDone;