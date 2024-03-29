import {Row, Col} from 'react-bootstrap'
import HideProjects from './HideProjects';
import styles from '../../styles/toolbar.module.scss';
import ToggleTheme from './ToggleTheme';
import SaveAsTemplate from './SaveAsTemplate';

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
            </Row>
        </section>
     );
}
 
export default Toolbar;