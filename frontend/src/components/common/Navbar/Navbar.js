import React, {useContext} from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import {AuthContext} from "../../../context/AuthContext"
import './Navbar.css'

export const Navbar = () => {

    const history = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history('/')
    }
    return (
        <nav>
            <div className="nav-wrapper grey darken-4" style={{padding: "0 2rem", maxWidth: "100%"}}>
                <div className="brand-logo">Учет задач проекта</div>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/add-task/_add">Создать</NavLink></li>
                    <li><NavLink to="/tasks">Список</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти из пользователя</a></li>
                </ul>
            </div>
        </nav>
    )
}
