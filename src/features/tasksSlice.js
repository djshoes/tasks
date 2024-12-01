import { createSlice } from '@reduxjs/toolkit'

function sortTasks(tasks, payload){
    let done = [];
    let todo = [];
    let pinned = [];
    tasks.forEach(item => {
        //set clicked item to done
        if(payload.done !== undefined) {
            item.id === payload.id ? item.done = payload.done : null
        } else if (payload.pinned !== undefined) {
            item.id === payload.id ? item.pinned = payload.pinned : null
        }
        //resort so pinned first
        if(item.pinned) {
            pinned.push(item)
        } else if(item.done) {
            done.push(item)
        } else todo.push(item)
        //item.done ? done.push(item) : todo.push(item)
    });
    return [...pinned, ...todo, ...done];
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        value: [],
        allTasks: localStorage.getItem("todolist") ? JSON.parse(localStorage.getItem("todolist")) : [{ done: false, id: 324, name: 'Add more tasks', projectId: 23432, time: ' ', pinned: false}]
    },
    reducers: {
        loadList: (state, action) => {
            state.value = state.allTasks.filter(item => item.projectId === action.payload.id)
        },
        addTask: (state, action) => {
            state.allTasks = [...state.allTasks, action.payload]
            state.allTasks = sortTasks(state.allTasks, action.payload);
        },
        removeTask: (state, action) => {
            state.allTasks = state.allTasks.filter(item => item.id !== action.payload)
        },
        done: (state, action) => {
            //console.log(action.payload)

            state.allTasks = sortTasks(state.allTasks, action.payload);
        },
        pin: (state, action) => {
            state.allTasks = sortTasks(state.allTasks, action.payload);
        },
        load: (state) => {
            state.value = JSON.parse(localStorage.getItem("todolist"))
        },
        removeProjectTasks: (state, action) => {
            //console.log('remove tasks atction')
            //console.log(action)
            state.allTasks = state.allTasks.filter(item => item.projectId !== action.payload.id)
        },
        loadState: (state, action) => {
            state.allTasks = action.payload.value
            state.value = []
        },
        addTaskTags: (state, action) => {
            let task = state.allTasks.find(item => item.id === action.payload.id)
            task.tags ? task.tags = [...task.tags, action.payload.tags] 
                : task.tags = [action.payload.tags]
        },
        removeTag: (state, action) => {
            let task = state.allTasks.find(item => item.id === action.payload.id)
            task.tags = task.tags.filter(tag => tag !== action.payload.tag)
        },
        deleteAllDone: (state, action) => {
            state.allTasks = state.allTasks.filter(task => (task.projectId === action.payload.currentProject && !task.done) || task.projectId !== action.payload.currentProject)
        }
    }
})

export const { 
    addTask, 
    removeTask, 
    done, 
    load, 
    loadList, 
    removeProjectTasks, 
    loadState, 
    pin ,
    addTaskTags,
    removeTag,
    deleteAllDone
} = tasksSlice.actions

export default tasksSlice.reducer