import { useSelector, useDispatch } from 'react-redux'
import { useContext } from 'react';
import { FirebaseContext } from '../firebase'
import { Button, Col, Row } from 'react-bootstrap';
import styles from '../styles/accountBtn.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { toggleAccountMenu } from '../features/firebaseSlice';
import google from '../assets/images/google.svg'

const AccountBtn = () => {
    const authStatus = useSelector((state) => state.firebase.auth)
    const user = useSelector((state) => state.firebase.user)
    const menu = useSelector(state => state.firebase.accountMenuOpen)
    const firebase = useContext(FirebaseContext)
    const dispatch = useDispatch()

    const toggleAccount = () => {
        dispatch(toggleAccountMenu());
    }
    return ( 
        <>
            {!authStatus ?
                <Button variant="primary" onClick={firebase.signInWithGoogle}><img className={styles.gsvg} src={google} /> Sign in</Button>
                :
                <div className='position-relative accoutnBtn'>
                    <img onClick={toggleAccount} height='40' style={{ borderRadius: '50%' }} src={user.profilePic} className='accoutnBtn' />
                    <div className={`${styles.accountDropdown} ${menu ? 'd-block' : 'd-none'}`}>
                        <Row>
                            <Col md={3}><img height='45' src={user.profilePic} /></Col>
                            <Col md={9}>
                                <p>{user.displayName}</p>
                                <p>{user.email}</p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col md={2}><FontAwesomeIcon icon={faRightFromBracket} /></Col>
                            <Col md={9}><span onClick={firebase.signOut}>Sign out</span></Col>
                        </Row>
                    </div>
                </div>
                
            }
        </>
     );
}
 
export default AccountBtn;