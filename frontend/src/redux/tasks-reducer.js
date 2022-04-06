const GET_TASKS = 'GET_TASKS'

let initialState = {
    tasks: []
}

const tasksReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }

        default:
            return state
    }
}


export const getTasksActionCreator = (tasks) => ({type: GET_TASKS, tasks})

export const getTasksDispatch = (tasks) => {

    return (dispatch) => {
        dispatch(getTasksActionCreator(tasks))
    }
}

export default tasksReducer
