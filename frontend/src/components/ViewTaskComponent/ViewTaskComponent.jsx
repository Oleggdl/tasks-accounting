import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"
import {AuthContext} from "../../context/AuthContext"
import './ViewTaskComponent.scss'

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/main/tasks'

const ViewTaskComponent = () => {

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [state, setState] = useState({
        id: useParams().id,
        task: {}
    })

    const getTaskById = useCallback(async (id) => {
        try {
            const fetched = await request(EMPLOYEE_API_BASE_URL + '/' + id, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setState({...state, task: fetched})
        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getTaskById(state.id)
    }, [])

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">Просмотр деталей задачи проекта</h3>
                <div className="card-body">
                    <div className="row">
                        <label>Название задачи: </label>
                        <span> {state.task.task_name} </span>
                    </div>
                    <div className="row">
                        <label>Ответственный: </label>
                        <span> {state.task.accountable} </span>
                    </div>
                    <div className="row">
                        <label>Исполняющий: </label>
                        <span> {state.task.performing} </span>
                    </div>
                    <div className="row">
                        <label>Крайний срок исполнения: </label>
                        <span> {state.task.deadline} </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTaskComponent
