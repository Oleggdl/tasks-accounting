import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import tasksReducer from "./tasks-reducer"

let reducers = combineReducers({
    tasksReducer: tasksReducer
})

const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware))

export default store
