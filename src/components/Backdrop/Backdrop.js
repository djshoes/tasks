import { useEffect, useState } from 'react';
import { toggleSidebarMenu } from '../../features/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Backdrop.module.scss'

const Backdrop = props => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        setShow(props.show)
    },[props.show])

    return ( 
        <div onClick={() => dispatch(toggleSidebarMenu())} className={`${styles.Backdrop} ${show ? '' : 'd-none'}`}></div>
     );
}
 
export default Backdrop;