import { createSlice } from '@reduxjs/toolkit'

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        projectNotes: [],
        allNotes: localStorage.getItem("notes") && localStorage.getItem("notes") != 'undefined' ? JSON.parse(localStorage.getItem("notes")) : []
    },
    reducers: {
        loadNotes: (state, action) => {
            state.projectNotes = state.allNotes.filter(item => item.projectId === action.payload.id)
        },
        addNote: (state, action) => {
            state.allNotes = [...state.allNotes, action.payload]
        },
        removeNote: (state, action) => {
            state.allNotes = state.allNotes.filter(item => item.id !== action.payload)
        },
        removeProjectNotes: (state, action) => {
            state.allNotes = state.allNotes.filter(item => item.projectId !== action.payload.id)
        },
        loadState: (state, action) => {
            state.allNotes = action.payload.value
            state.projectNotes = []
        }
    }
})

export const { loadNotes, addNote, removeNote, removeProjectNotes, loadState } = notesSlice.actions

export default notesSlice.reducer