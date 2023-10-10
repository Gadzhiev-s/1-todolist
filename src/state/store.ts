import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reduser";
import {todolistsReduser} from "./todolists-reduser";

const  rootReducer =combineReducers({
    tasks:tasksReducer,
    todolists:todolistsReduser
})
export  const  store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store