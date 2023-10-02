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

export const tasksReducer = (state: TasksStateType, action: ActionsTypeForTasks): TasksStateType => {
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
      const stateCopy = {...state};

      let tasks = stateCopy[action.todolistId];
      // найдём нужную таску:
      let task = tasks.find(t => t.id === action.taskId);
      //изменим таску, если она нашлась
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = {...state};

      let tasks = stateCopy[action.todolistId];
      // найдём нужную таску:
      let task = tasks.find(t => t.id === action.taskId);
      //изменим таску, если она нашлась
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
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
      throw new Error("I don't understand this type")
  }
}
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', todolistId, taskId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

