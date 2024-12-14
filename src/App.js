import './App.css';
import './styles/themes.scss';
import { Row, Col, Container } from 'react-bootstrap'
import List from './components/list'
import Notes from './components/notes';
import Projects from './components/projects'
import Toolbar from './components/toolbar/Toolbar';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux'
import { closeAccountMenu, setAuth } from './features/firebaseSlice';
import AccountBtn from './components/AccountBtn';
import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from './firebase'
import { loadState as loadProjectState } from './features/projectsSlice';
import { loadState as loadTasksState } from './features/tasksSlice';
import { loadState as loadNotesState } from './features/notesSlice';
import { loadState as loadTemplatesState } from './features/templatesSlice';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';


function App() {
  const dispatch = useDispatch()
  const firebase = useContext(FirebaseContext)

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      dispatch(setAuth({ user: uid, profilePic: user.photoURL, displayName: user.displayName, email: user.email}))
    } else {
      dispatch(setAuth({ user: null, profilePic: null, displayName: null, email: null}))
    }
  });

  const projects  = useSelector(state => state.projects.value)
  const notes     = useSelector(state => state.notes.allNotes)
  const todolist  = useSelector(state => state.tasks.allTasks)
  const templates = useSelector(state => state.templates.projecttemplates)
  const userId    = useSelector(state => state.firebase.auth)

  const [firstLoad, setFirstLoad] = useState(true)

  const saveToLocalStorage = () => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("templates", JSON.stringify(templates));
  }

  useEffect(() => {
    if(firstLoad) {
      setFirstLoad(false)
      return
    }

    if (userId) {
      firebase.saveToFirestore({ userId: userId, projects: projects, notes: notes, todolist, todolist, templates: templates })
    } else saveToLocalStorage()
    
  }, [projects, notes, todolist, templates])

  const loadState = (projects, notes, todolist, templates) => {
    dispatch(loadProjectState({ value: projects }))
    dispatch(loadNotesState({ value: notes }))
    dispatch(loadTasksState({ value: todolist }))
    dispatch(loadTemplatesState({ value: templates }))
  }

  useEffect(async () => {
    if (userId) {
      const data = await firebase.loadFromFirestore(userId)
      //this line causes an console error if new user as they won't have these fields in db yet
      loadState(data.projects, data.notes, data.todolist, data.templates ? data.templates : null)
    } else {
      //this is if you sign out it will load what's in local storage
      loadState(
        localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : [],
        localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [],
        localStorage.getItem("todolist") ? JSON.parse(localStorage.getItem("todolist")) : [],
        localStorage.getItem("templates") ? JSON.parse(localStorage.getItem("templates")) : []
        )
    }
  }, [userId])

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      if (!event.target.classList.contains('accoutnBtn')) {
        dispatch(closeAccountMenu())
      }
    })
  }, [])

  return (
    <div className="App">
        <Container fluid>
          <div className='d-flex justify-content-between align-items-center'>
            <h2 className='py-2'>Task Manager</h2>
            <AccountBtn />
          </div>
          <hr style={{backgroundColor: '#333', margin: '0px'}} />
          <Toolbar />
          <Row>
            <Col md={3} lg={2} id='projectsCol' className='border-right'>
              <Projects />
            </Col>
            <Col md={6}>
              <List />
            </Col>
            <Col>
              <Notes />
            </Col>
          </Row>
        </Container>
        <SidebarMenu />
    </div>
  );
}

export default App;
