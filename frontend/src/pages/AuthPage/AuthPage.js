import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../../../../../../../other/Курсовая/React_Spring_App/frontend/src/hooks/http.hook"
import {useMessage} from "../../../../../../../other/Курсовая/React_Spring_App/frontend/src/hooks/message.hook"
import {AuthContext} from "../../../../../../../other/Курсовая/React_Spring_App/frontend/src/context/AuthContext"
import {Button, Form, Input} from "antd"
import 'antd/dist/antd.css'
import './AuthPage.scss'


export const AuthPage = () => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [isLogIn, setIsLogin] = useState(true)
    const [form, setForm] = useState({
        name: '', username: '', email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({...form, [event.target.id]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            console.log({...form})
            const data = await request('api/auth/signup', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('api/auth/signin', 'POST', {...form})
            auth.login(data.token, data.id)

        } catch (e) {
        }

    }

    return (
        <div className="row authContainer">
            <h1 style={{paddingLeft: "20px", textAlign: 'center'}}>Web-платформа для учета задач проекта</h1>
            <div className="col s6 offset-s3 authContainer" style={{marginTop: 30}}>
                <div className="card grey darken-4">
                    {isLogIn ? <div className="card-content white-text">
                            <span className="card-title">Авторизация</span>
                            <div>
                                <div className="input-field">
                                    <input id="username" type="text" value={form.username}
                                           name="username" className="red-input" onChange={changeHandler}/>
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div className="input-field">
                                    <input id="password" type="password" value={form.password}
                                           name="password" className="red-input" onChange={changeHandler}/>
                                    <label htmlFor="password">Password</label>
                                </div>
                                <button className="btn red darken-4"
                                        style={{marginRight: 10}}
                                        onClick={loginHandler}
                                        disabled={loading}>Log in
                                </button>
                                <hr/>
                                <p>Еще не создан аккаунт?</p>
                                <button className="btn grey lighten-1 black-text"
                                        onClick={() => setIsLogin(false)}
                                        disabled={loading}>Log up
                                </button>
                            </div>
                        </div>
                        : <div className="card-content white-text">
                            <span className="card-title">Регистрация пользователя</span>
                            <div>
                                <Form onFinish={() => {
                                    registerHandler()
                                    setIsLogin(false)
                                }}>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        className="formItem"
                                        rules={[{required: true, message: 'Пожалуйста, введите ваше имя!'}]}>
                                        <Input className="red-input" value={form.name} onChange={changeHandler}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        className="formItem"
                                        rules={[{required: true, message: 'Пожалуйста, введите ваш username!'}]}>
                                        <Input className="red-input" value={form.username} onChange={changeHandler}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        className="formItem"
                                        rules={[{required: true, message: 'Пожалуйста, введите ваш email!'}]}>
                                        <Input className="red-input" value={form.email} onChange={changeHandler}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        className="formItem"
                                        rules={[{required: true, message: 'Пожалуйста, введите ваш пароль!'}]}>
                                        <Input.Password className="red-input inputPassword" value={form.password}
                                                        onChange={changeHandler}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button className="btn grey lighten-1 black-text"
                                                htmlType="submit"
                                                disabled={loading}>Log up
                                        </Button>
                                    </Form.Item>
                                    <hr/>
                                    <p style={{color: "#ffffff"}}>Уже существует аккаунт?</p>
                                    <button className="btn red darken-4"
                                            style={{marginRight: 10}}
                                            onClick={() => setIsLogin(true)}
                                            disabled={loading}>Log in
                                    </button>
                                </Form>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}
