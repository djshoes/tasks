import { createSlice, current } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        value: {currentProject: 75775375},
        tasks: [],
        sidebarMenuOpen: false,
        currentTaskId: null
    },
    reducers: {
        //write these functions properly
        setProjectId: (state, action) => {
            console.log(action.payload.id)
            state.value = {currentProject: action.payload.id}
        },
        toggleSidebarMenu: (state) => {
            state.sidebarMenuOpen = !state.sidebarMenuOpen
        },
        updateCurrentTaskId: (state, action) => {
            state.currentTaskId =  action.payload.id
        }
    }
})

export const { setProjectId, toggleSidebarMenu, updateCurrentTaskId } = settingsSlice.actions

export default settingsSlice.reducer