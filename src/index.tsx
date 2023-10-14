import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(<App/>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
//


// import React, {useCallback, useState} from 'react'
// import ReactDOM from 'react-dom'

// export const App = () => {
//   const [temp, setTemp] = useState(10)
//   const [seconds, setSeconds] = useState(100)
//
//   const increaseSeconds = () => setSeconds(seconds + 10)
//   const increaseTemp = useCallback(() => {
//     setTemp(temp + 1)
//   }, [temp])
//
//   return <>
//     <TempDisplay temp={temp} increaseTemp={increaseTemp}/>
//
//     <div>
//       <b>Секунды :</b> {seconds} с
//       <button style={{marginLeft: '15px'}}
//               onClick={increaseSeconds}>
//         Увеличить на 10 секунд
//       </button>
//     </div>
//   </>
// }
// const TempDisplay = React.memo((props: any) => {
//   console.log('Render TempDisplay')
//   return (
//      <div style={{marginBottom: '15px'}}
//           onClick={props.reset}>
//        <b>Температура:</b> {props.temp} &#176;
//        <button style={{marginLeft: '15px'}}
//                onClick={props.increaseTemp}>
//          Увеличить температуру на 1 градус
//        </button>
//      </div>
//   )
// })
//
// ReactDOM.render(<App/>, document.getElementById('root'));
//
// // Что надо написать вместо XXX для того, чтобы обязательно выполнялись 2 условия:
// // 1) При нажатии на кнопку "Увеличить температуру на 1 градус" температура увеличивалась
// // 2) Компонент TempDisplay не должен перерисовываться при нажатии на кнопку "Увеличить на 10 секунд"
//
// // Пример ответа: useEffect(() => setCounter(count + 1), [count])

//
// import React, {useCallback, useState} from 'react'
// import ReactDOM from 'react-dom'
//
// export const TempManager = () => {
//   const [temp, setTemp] = useState(0)
//   const [seconds, setSeconds] = useState(0)
//
//   const resetTemp = useCallback(() => setTemp(0), [])
//   const increaseSeconds = () => setSeconds(seconds + 100)
//
//   return (
//      <>
//        <TempDisplay temp={temp} reset={resetTemp}/>
//        <div>
//          <p><b>Секунды:</b> {seconds} с</p>
//          <button onClick={increaseSeconds}>
//            Увеличить время на 100 секунд
//          </button>
//        </div>
//      </>
//   )
// }
//
// const TempDisplay = React.memo((props: any) => {
//   console.log('Render TempDisplay')
//   return (
//      <div>
//        <p><b>Температура</b>: {props.temp} &#176;</p>
//        <button onClick={props.reset}>Reset</button>
//      </div>
//   )
// })
//
// ReactDOM.render(<TempManager/>, document.getElementById('root'))


//При увеличении времени (при клике на button) компонент TempDisplay
//тоже перерисовывается. Эта перерисовка является избыточной.
//Найдите в чем причина лишних перерисовок.
//Исправленную версию строки напишите в качестве ответа.

//Пример ответа: const increaseSeconds = () => setSeconds(seconds + 100)
// export const reducer = (state: any, action: any) => {
//   switch (action.type) {
//     case 'TRACK-DELETED':
//       return state.filter((track: any) => track.id !== action.trackId)
//     default:
//       return state
//   }
// }
//
// const deleteTrackAC = (trackId: number) => {
//   return {type: 'TRACK-DELETED', trackId} as const
// }
//
//
// const state = [
//   {id: 12, likesCount: 10},
//   {id: 14, likesCount: 2},
//   {id: 100, likesCount: 0}
// ]
//
// const newState = reducer(state, deleteTrackAC(14))
// console.log(newState.length === 2)
//
// // Что нужно написать вместо XXX, чтобы корректно удалить трек и в консоли увидеть true?


// let initialState = {items: [{name: 'Dimych'}, {name: 'Ignat'}]}
// const usersReducer = (state = initialState, action: any) => {
//   return state
// }
//
// let authInitialState = {login: 'Margo', settings: {theme: 'dark'}}
// const authReducer = (state = authInitialState, action: any) => {
//   return state
// }
//
// const store = createStore(combineReducers({
//   users: usersReducer,
//   auth: authReducer
// }))
//
// store.subscribe(() => {
//   const login = store.getState().auth.login
//   console.log(login)
// })
//
// store.dispatch({type: 'ANY'})
// export default store;
//
// // Что нужно написать вместо XXX, чтобы в консоли увидеть 'Margo'?

// export const reducer = (state: any, action: any) => {
//   switch (action.type) {
//     case 'USER-NAME-UPDATED':
//       return {
//         ...state, user: {...state.user, name: action.name}
//       }
//
//     default:
//       return state
//   }
// }
//
// const updateUserNameAC = (name: string) => ({type: 'USER-NAME-UPDATED', name})
//
//
// const state = {
//   count: 10,
//   user: {
//     name: 'Dimych',
//     age: 18,
//     isMarried: true,
//     status: "offline"
//   },
//   books: ['you don\'t know JS']
// }
// const newState = reducer(state, updateUserNameAC('Dmitry'))
//
// console.log(newState.user.name === 'Dmitry')
// console.log(newState.books === state.books)
// console.log(newState.user !== state.user)
//
// //Что нужно написать вместо XXX, чтобы корректно обновить имя пользователя и в консоли увидеть:  true true true?


// export const reducer = (state: any, action: any) => {
//   switch (action.type) {
//     case 'TRACK-ADDED':
//       return {
//         ...state,
//         [action.trackId]: {
//           id: action.trackId, likesCount: 0
//         }
//       }
//     default:
//       return state
//   }
// }
//
// const addTrackAC = (trackId: number) => ({type: 'TRACK-ADDED', trackId})
//
// const state = {
//   12: {id: 12, likesCount: 10},
//   14: {id: 14, likesCount: 2},
//   100: {id: 100, likesCount: 0},
// }
// const newState = reducer(state, addTrackAC(300))
// console.log(newState[300].likesCount === 0)

// Что нужно написать вместо XXX, чтобы в консоли увидеть true?


// import React, {useState, useReducer, useEffect} from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
//
// const changeCounter = (state: number, action: any): number => {
//   switch (action.type) {
//     case "INC_VALUE":
//       return state + 1
//     case "RESET":
//       return 0
//     case "DEC_VALUE":
//       return state - 1
//     default:
//       return state
//   }
// }
//
// function Counter() {
//   const [value, setValue] = useReducer(changeCounter, 0)
//   const [isCounter, setIsCounter] = useState(true)
//   const commonStyles: React.CSSProperties = {
//     border: "1px solid black",
//     margin: "100px auto",
//     width: "300px",
//     height: "150px",
//     textAlign: "center",
//   }
//   const btnStyles: React.CSSProperties = {
//     color: "white",
//     fontWeight: "bold",
//     backgroundColor: "darkgray",
//     borderRadius: "3px",
//     minWidth: "40px"
//   }
//
//   return (
//      <div style={commonStyles}>{
//        isCounter
//           ? <div>
//             <div style={{marginBottom: "20px"}}>
//               <h2>{value}</h2>
//               <button
//                  style={{...btnStyles, backgroundColor: "red"}}
//                  onClick={() => setIsCounter(false)}>OFF
//               </button>
//             </div>
//             <button style={btnStyles} onClick={() => setValue({type: "INC_VALUE"})}>+</button>
//             <button style={btnStyles} onClick={() => setValue({type: "RESET"})}>0</button>
//             <button style={btnStyles} onClick={() => setValue({type: "DEC_VALUE"})}>-</button>
//
//           </div>
//           : <div style={{textAlign: "center"}}>
//             <h2>Counter not working</h2>
//             <button
//                style={{...btnStyles, backgroundColor: "green"}}
//                onClick={() => setIsCounter(true)}>ON
//             </button>
//           </div>
//      }
//      </div>
//   )
// }
//
//
// ReactDOM.render(
//    <Counter/>, document.getElementById('root')
// );
// // Что надо написать вместо XXX и YYY, чтобы код работал? Напишите через пробел.







