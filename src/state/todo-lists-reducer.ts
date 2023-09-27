import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST',
  title: string
  todoListID: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

type ActionsType =
   RemoveTodolistActionType
   | AddTodolistActionType
   | ChangeTodolistTitleActionType
   | ChangeTodolistFilterActionType;

export let todoListId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistType> = [
  {id: todoListId1, title: "What to learn", filter: "all"},
  {id: todolistId2, title: "What to buy", filter: "all"}
]
export const todoListsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id != action.id)
    case 'ADD-TODOLIST':
      return [...state, {id: action.todoListID, title: action.title, filter: "all"}]
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(todoList => todoList.id === action.id ? {...todoList, title: action.title} : todoList)

    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(todoList => todoList.id === action.id ? {...todoList, title: action.filter} : todoList)

    }
    default:
      return state
  }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', title: title, todoListID: v1()} as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId} as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId} as const
}
