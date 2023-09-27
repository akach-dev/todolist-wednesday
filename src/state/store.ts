import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todo-lists-reducer";
import {tasksReducer} from "./tasks-reducer";

export type AppRootType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store