import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistAC, AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>


type ActionsType =
   RemoveTaskACType
   | AddTaskACType
   | ChangeTaskStatusAC
   | ChangeTaskTitleAC
   | AddTodolistActionType
   | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state, [action.todolistId]: state[action.todolistId].filter(task =>
           task.id !== action.id
        )
      }
    case "ADD-TASK":
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      }
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task =>
           task.id === action.id ? {...task, isDone: action.isDone} : task
        )
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task =>
           task.id === action.id ? {...task, title: action.title} : task
        )
      }
    case "ADD-TODOLIST":
      return {...state, [action.id]: []}

    case "REMOVE-TODOLIST":
      const {[action.id]: [], ...rest} = state
      return rest

    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (id: string, todolistId: string) => {
  return {type: 'REMOVE-TASK', id, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
  return {type: 'ADD-TASK', title, todolistId} as const
};
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
  return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const
};
export const changeTaskTitleAC = (id: string, title: string, todolistId: string) => {
  return {type: 'CHANGE-TASK-TITLE', id, title, todolistId} as const
}