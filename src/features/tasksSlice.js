import { createSlice } from '@reduxjs/toolkit'

function sortDone(tasks, payload){
    let done = [];
    let todo = [];
    tasks.forEach(item => {
        //set clicked item to done
        item.id === payload.id ? item.done = payload.done : null
        item.done ? done.push(item) : todo.push(item)
    });
    return [...todo, ...done];
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        value: [],
        allTasks: localStorage.getItem("todolist") ? JSON.parse(localStorage.getItem("todolist")) : [{ done: false, id: 324, name: 'Add more tasks', projectId: 23432, time: ' '}]
    },
    reducers: {
        loadList: (state, action) => {
            state.value = state.allTasks.filter(item => item.projectId === action.payload.id)
        },
        addTask: (state, action) => {
            state.allTasks = [...state.allTasks, action.payload]
            state.allTasks = sortDone(state.allTasks, action.payload);
        },
        removeTask: (state, action) => {
            state.allTasks = state.allTasks.filter(item => item.id !== action.payload)
        },
        done: (state, action) => {
            console.log(action.payload)

            state.allTasks = sortDone(state.allTasks, action.payload);
        },
        load: (state) => {
            state.value = JSON.parse(localStorage.getItem("todolist"))
        },
        removeProjectTasks: (state, action) => {
            console.log('remove tasks atction')
            console.log(action)
            state.allTasks = state.allTasks.filter(item => item.projectId !== action.payload.id)
        },
        loadState: (state, action) => {
            state.allTasks = action.payload.value
            state.value = []
        }
    }
})

export const { addTask, removeTask, done, load, loadList, removeProjectTasks, loadState } = tasksSlice.actions

export default tasksSlice.reducer