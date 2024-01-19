import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const HideProjects = () => {
    const [rotate, setRotate] = useState(false)
    const slideAway = () => {
        document.getElementById('projectsCol').classList.toggle('moveleft')
        setRotate(!rotate)
    }
    const style = {transform: 'rotate(180deg)', transition: '.2s all'}
    return (<FontAwesomeIcon style={rotate ? style : null} onClick={slideAway} icon={faChevronLeft} /> );
}
 
export default HideProjects;