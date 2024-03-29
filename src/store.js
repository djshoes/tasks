import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './features/tasksSlice'
import projectsReducer from './features/projectsSlice'
import settingsReducer from './features/settingsSlice'
import notesReducer from "./features/notesSlice";
import templatesReducer from "./features/templatesSlice";
import firebaseReducer from "./features/firebaseSlice"

export default configureStore({
    reducer: {
        tasks: tasksReducer,
        projects: projectsReducer,
        settings: settingsReducer,
        notes: notesReducer,
        templates: templatesReducer,
        firebase: firebaseReducer
    }
})