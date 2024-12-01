import {Row, Col} from 'react-bootstrap'
import HideProjects from './HideProjects';
import styles from '../../styles/toolbar.module.scss';
import ToggleTheme from './ToggleTheme';
import SaveAsTemplate from './SaveAsTemplate';
import PlusBtn from '../PlusBtn'
import DeleteAllDone from './DeleteAllDone';

const Toolbar = () => {
    return ( 
        <section className={styles.toolbar}>
            <Row>
                <Col>
                    <HideProjects />
                </Col>
                <Col>
                    <ToggleTheme />
                </Col>
                <Col>
                    <SaveAsTemplate />
                </Col>
                <Col>
                    <DeleteAllDone />
                </Col>
            </Row>
            <div className='ms-auto'><PlusBtn /></div>
        </section>
     );
}
 
export default Toolbar;