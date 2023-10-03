import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todo-lists-reducer';

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todolistId: string
  taskId: string
}
export type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todolistId: string
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  taskId: string
  todolistId: string
  isDone: boolean
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskId: string
  todolistId: string
  title: string
}

export type ActionsTypeForTasks = RemoveTaskActionType | AddTaskActionType
   | ChangeTaskStatusActionType | ChangeTaskTitleActionType
   | AddTodolistActionType | RemoveTodolistActionType;

const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTypeForTasks): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = {...state};
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter(t => t.id !== action.taskId)
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case 'ADD-TASK': {
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
          ...task,
          isDone: action.isDone
        } : task)
      }
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {
          ...task,
          title: action.title
        } : task)
      }

    }
    case 'ADD-TODOLIST': {
      return {...state, [action.todolistId]: []}
    }
    case 'REMOVE-TODOLIST': {
      // const stateCopy = {...state};
      // delete stateCopy[action.id]
      // return stateCopy;

      // const copy = {...state}
      //
      // copy[action.id] = []
      //
      // return copy

      const {[action.id]: [], ...rest} = state

      return rest

    }
    default:
      return state
  }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

