import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import TaskMenu from './TaskMenu'
import Tag from './Tag/Tag'

const Task = (props) => {

    return ( 
            <li className={`d-flex justify-content-between align-items-center ${props.item.pinned ? '' : 'border-bottom'} py-3`}>
                <div>
                    <p className='mb-0' style={props.item.done ? { textDecoration: 'line-through' } : null}>{props.item.name}</p>
                    <small className='text-muted d-inline-block mr-2'>{props.item.time ? props.item.time : ''}</small>
                    {props.item.tags ? 
                        props.item.tags.map((tag, i) => {
                            return <Tag key={i} tag={tag} />
                            
                        })
                        : null
                    }
                </div>
                <div className='ml-auto'>
                    <span style={{ cursor: 'poiner' }} onClick={() => props.taskDone(props.item.id, !props.item.done)}>
                        {props.item.done ? <FontAwesomeIcon color='green' icon={faCircleCheck} /> : <FontAwesomeIcon color='grey' icon={faCircle} />}
                    </span>
                </div>
                <TaskMenu pin={props.taskPinned} taskId={props.item.id} pinned={props.item.pinned} />
            </li>
     );
}
 
export default Task;