import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAC, AddTodolistActionType, RemoveTodolistAC, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

type ActionType =
   RemoveTaskAC
   | AddTaskAC
   | ChangeTaskStatusAC
   | ChangeTaskTitleAC
   | AddTodolistActionType
   | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case "REMOVE=TASK":
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.id)
      }
    case "ADD-TASK":
      let task = {id: v1(), title: action.title, isDone: false};
      return {
        ...state,
        [action.todoListID]: [task, ...state[action.todoListID]]
      }
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map(task =>
           task.id === action.id ? {...task, isDone: action.isDone} : task
        )
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task =>
           task.id === action.id ? {...task, title: action.newTitle} : task
        )
      }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todoListID]: []
      }
    case "REMOVE-TODOLIST":
      // const {[action.id]: [], ...rest} = state
      // return rest

      const copy = {...state}
      delete copy[action.id]
      return copy
    

    default:
      throw new Error('I don"t  have this type')
  }
};


export const removeTaskAC = (id: string, todoListID: string) => {
  return {type: 'REMOVE=TASK', id, todoListID} as const
};
export const addTaskAC = (title: string, todoListID: string) => {
  return {type: 'ADD-TASK', title, todoListID} as const
};
export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string) => {
  return {type: 'CHANGE-TASK-STATUS', id, todoListID, isDone} as const
};
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
  return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId} as const
}