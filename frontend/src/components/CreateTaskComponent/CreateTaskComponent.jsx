import React, {useCallback, useContext, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import {AuthContext} from "../../context/AuthContext"

const TASK_API_BASE_URL = 'http://localhost:8080/api/main/tasks'

const CreateTaskComponent = ({tasks}) => {

    const currentId = useParams().id

    const initialState = {
        id: currentId,
        task_name: '',
        accountable: '',
        performing: '',
        deadline: ''
    }

    const currentTask = currentId !== '_add' ? tasks.filter(task => +task.id === +currentId)[0] : initialState
    const history = useNavigate()
    const [state, setState] = useState({
        id: currentId,
        task_name: currentTask.task_name,
        accountable: currentTask.accountable,
        performing: currentTask.performing,
        deadline: currentTask.deadline
    })
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const createTask = useCallback(async (task) => {
        try {
            const fetched = await request(TASK_API_BASE_URL, 'POST', task, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
        }
    }, [token, request])

    const updateTask = useCallback(async (id, task) => {
        try {
            const fetched = await request(TASK_API_BASE_URL + '/' + id, 'PUT', task, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
        }
    }, [token, request])


    const saveOrUpdateTask = (e) => {
        e.preventDefault()
        let task = {task_name: state.task_name, accountable: state.accountable,
            performing: state.performing, deadline: state.deadline}

        if (state.id === '_add') {
            createTask(task)
            history('/tasks')
        } else {
            updateTask(currentId, task)
            history('/tasks')
        }
    }

    const changeTaskNameHandler = (event) => {
        setState({...state, task_name: event.target.value})
    }

    const changeAccountableHandler = (event) => {
        setState({...state, accountable: event.target.value})
    }

    const changePerformingHandler = (event) => {
        setState({...state, performing: event.target.value})
    }

    const changeDeadlineHandler = (event) => {
        setState({...state, deadline: event.target.value})
    }

    const cancel = () => {
        history('/tasks')
    }

    const getTitle = () => {
        if (state.id === '_add') {
            return <h3 className="text-center">Добавить задачу</h3>
        } else {
            return <h3 className="text-center">Изменить задачу</h3>
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {getTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group" style={{marginBottom: "20px"}}>
                                    <label>Название задачи</label>
                                    <input placeholder="Название задачи" name="task_name" className="form-control"
                                           value={state.task_name} onChange={changeTaskNameHandler}/>
                                </div>
                                <div className="form-group" style={{marginBottom: "20px"}}>
                                    <label>Ответственный</label>
                                    <input placeholder="Ответственный" name="accountable" className="form-control"
                                           value={state.accountable} onChange={changeAccountableHandler}/>
                                </div>
                                <div className="form-group" style={{marginBottom: "20px"}}>
                                    <label>Исполняющий</label>
                                    <input placeholder="Исполняющий" name="performing" className="form-control"
                                           value={state.performing} onChange={changePerformingHandler}/>
                                </div>
                                <div className="form-group" style={{marginBottom: "20px"}}>
                                    <label>Крайний срок</label>
                                    <input placeholder="Крайний срок" name="deadline" className="form-control"
                                           type="date" value={state.deadline} onChange={changeDeadlineHandler}/>
                                </div>
                                <button className="btn btn-success" onClick={saveOrUpdateTask}>Сохранить</button>
                                <button className="btn btn-danger" onClick={cancel}
                                        style={{marginLeft: "10px"}}>Отмена
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskComponent
