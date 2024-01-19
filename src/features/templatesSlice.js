import { createSlice } from '@reduxjs/toolkit'

export const templatesSlice = createSlice({
    name: 'templates',
    initialState: {
        projecttemplates: [{name: 'blank', tasks: []}]
    },
    reducers: {
        saveTemplate: (state, action) => {
            state.projecttemplates = [...state.projecttemplates, action.payload.template]
            console.log(state.projecttemplates)
        },
        loadState: (state, action) => {
            if(action.payload.value !== null) {
                state.projecttemplates = action.payload.value
            }
        }
    }
})

export const { loadtemplates, saveTemplate, loadState } = templatesSlice.actions

export default templatesSlice.reducer