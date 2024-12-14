import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { removeProject } from "../../features/projectsSlice"
import { removeProjectNotes } from "../../features/notesSlice"
import { removeProjectTasks } from "../../features/tasksSlice"
import { loadList } from "../../features/tasksSlice"
import { loadNotes } from "../../features/notesSlice"
import { setProjectId } from "../../features/settingsSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const DeleteProject = () => {
    let dispatch = useDispatch()
    let projectId = useSelector(state => state.settings.value.currentProject)
    let project = useSelector(state => state.projects.value.find(item => item.id === projectId))
    let firstProject = useSelector(state => state.projects.value[0])

    const remove = () => {
            let x = window.confirm('Really delete project?');
            if (x) {
                dispatch(removeProject(project))
                dispatch(removeProjectTasks(project))
                dispatch(removeProjectNotes(project))
                dispatch(setProjectId(firstProject))
                dispatch(loadList(firstProject))
                dispatch(loadNotes(firstProject))
            }
        }

    return ( 
        <Button className="text-danger" onClick={() => remove()}>
            <FontAwesomeIcon icon={faTrashCan} />
        </Button>
     );
}
 
export default DeleteProject;