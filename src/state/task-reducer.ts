import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType,} from "./todolists-reducer";

type RemoveTaskAC = ReturnType<typeof removeTaskAC>
type AddTaskAC = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
type  ActionType =
   RemoveTaskAC
   | AddTaskAC
   | ChangeTaskStatusAC
   | ChangeTaskTitleAC
   | AddTodolistActionType
   | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionType) => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {...state, [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskID)}
    case "ADD-TASK":
      const newTask =
         {id: v1(), title: action.title, isDone: false}
      return {
        ...state, [action.todolistId]: [...state[action.todolistId], newTask]
      }
    case "CHANGE-TASK-STATUS":
      return {
        ...state, [action.todoListID]: state[action.todoListID].map(task =>
           task.id === action.taskID ? {...task, isDone: action.isDone} : task
        )
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state, [action.todoListID]: state[action.todoListID].map(task =>
           task.id === action.taskID ? {...task, title: action.title} : task
        )
      }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.id]: []
      }
    case "REMOVE-TODOLIST":

      // 1 вариант
      // const newTasks = {...state}
      // delete newTasks[action.id]
      // return newTasks

      // 2 вариант

      const {[action.id]: [], ...rest} = state
      return rest

    default :
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (taskID: string, todoListID: string) => {
  return {type: 'REMOVE-TASK', taskID, todoListID} as const
};
export const addTaskAC = (title: string, todolistId: string) => {
  return {type: 'ADD-TASK', title, todolistId} as const
};

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string) => {
  return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todoListID} as const
};

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, todoListID} as const
};

