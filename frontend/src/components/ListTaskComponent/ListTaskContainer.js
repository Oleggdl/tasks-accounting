import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook"
import {AuthContext} from "../../context/AuthContext"
import ListTaskComponent from "./ListTaskComponent"
import {useNavigate} from "react-router-dom"
import {compose} from "redux"
import {connect} from "react-redux"
import {getTasksDispatch} from "../../redux/tasks-reducer"

const TASK_API_BASE_URL = 'http://localhost:8080/api/main/tasks'

const ListTaskContainer = (props) => {

    const history = useNavigate()
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [test, setTest] = useState(0)

    const deleteTask = useCallback(async (id) => {
        try {
            const fetched = await request(TASK_API_BASE_URL + '/' + id, 'DELETE', null, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
        }
    }, [token, request])

    const getTasks = useCallback(async () => {
        try {
            const fetched = await request(TASK_API_BASE_URL, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            props.getTasksDispatch(fetched)

        } catch (e) {
        }
    }, [token, request])

    useEffect(() => {
        getTasks()
    }, [test])

    const viewTask = (id) => {
        history(`/view-task/${id}`)
    }

    const editTask = (id) => {
        history(`/add-task/${id}`)
    }

    const addTask = () => {
        history('/add-task/_add')
    }

    return (
        <div>
            <ListTaskComponent tasks={props.tasks} editTask={editTask} viewTask={viewTask}
                               deleteTask={deleteTask} addTask={addTask} setTest={setTest} test={test}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    tasks: state.tasksReducer.tasks
})

export default compose(
    connect(mapStateToProps, {getTasksDispatch})
)(ListTaskContainer)
