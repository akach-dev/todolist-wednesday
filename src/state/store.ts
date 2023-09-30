import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todo-lists-reducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoList: todoListsReducer,
})

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store