import styles from '../styles/project.module.scss'

const Project = (props) => {
    return ( 
        <div onClick={() => props.handleLoadList(props.project)} className={`card my-2 ${styles.project} project mx-2 ${props.active ? 'active' : ''}`}>
            <div className='card-body d-flex'>
                {props.name}
            </div>
        </div>
     );
}
 
export default Project;