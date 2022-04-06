import React from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import {AuthPage} from "../../../../../jira-clone/frontend/src/components/common/AuthComponent/AuthPage/AuthPage"
import ViewTaskComponent from "./components/ViewTaskComponent/ViewTaskComponent"
import ListTaskContainer from "./components/ListTaskComponent/ListTaskContainer"
import CreateTaskContainer from "./components/CreateTaskComponent/CreateTaskContainer"

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {

        return (
            <Routes>
                <Route path={'/'} exact element={<ListTaskContainer/>}/>
                <Route path={'/tasks'} element={<ListTaskContainer/>}/>
                <Route path={'/add-task/:id'} element={<CreateTaskContainer/>}/>
                <Route path={'/view-task/:id'} element={<ViewTaskComponent/>}/>
            </Routes>

        )
    }
    return (
        <Routes>
            <Route path="/" element={<AuthPage/>} exact/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}
