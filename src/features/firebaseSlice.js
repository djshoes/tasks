import { createSlice } from '@reduxjs/toolkit'

export const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        auth: null,
        user: {profilePic: null, displayName: null, email: null},
        accountMenuOpen: false
    },
    reducers: {
        setAuth: (state, action) => {
            if (!action.payload.user) state.accountMenuOpen = false
            state.auth = action.payload.user

            state.user.profilePic = action.payload.profilePic
            state.user.displayName = action.payload.displayName
            state.user.email = action.payload.email
        },
        toggleAccountMenu: (state) => {
            if(state.accountMenuOpen) {
                state.accountMenuOpen = false
            } else state.accountMenuOpen = true
        },
        closeAccountMenu: (state) => {
            state.accountMenuOpen = false
        }
    }
})

export const { setAuth, toggleAccountMenu, closeAccountMenu } = firebaseSlice.actions

export default firebaseSlice.reducer