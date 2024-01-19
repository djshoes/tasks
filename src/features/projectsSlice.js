import { createSlice } from '@reduxjs/toolkit'

export const projectsSlice = createSlice({
    name: 'projects',
    initialState: {
        value: localStorage.getItem("projects") ? JSON.parse(localStorage.getItem("projects")) : [{id: 23432, name: 'First Project'}],
        showAdd: false
    },
    reducers: {
        addProject: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        removeProject: (state, action) => {
            console.log(action.payload)
            state.value = state.value.filter(item => item.id !== action.payload.id)
        },
        loadState: (state, action) => {
            state.value = action.payload.value
        },
        openProjectForm: state => {
            state.showAdd = true
        },
            
        closeProjectForm: state => {
            state.showAdd = false
        }
    }
})

export const { addProject, removeProject, loadState, openProjectForm, closeProjectForm } = projectsSlice.actions

export default projectsSlice.reducer