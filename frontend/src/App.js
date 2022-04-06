import 'materialize-css'
import {BrowserRouter} from 'react-router-dom'
import {AuthContext} from "./context/AuthContext"
import {Navbar} from "./components/common/Navbar/Navbar"
import {useRoutes} from "./routes"
import {Loader} from "./components/common/Loader"
import {useAuth} from "./hooks/auth.hook"
import {Provider} from "react-redux"
import store from "./redux/redux-store"
import FooterComponent from "./components/common/FooterComponent/FooterComponent"


function App() {

    const {token, login, logout, userId, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
            <BrowserRouter>
                <Provider store={store}>
                    {isAuthenticated && <Navbar/>}
                    <div className="container">
                        {routes}
                    </div>
                    {isAuthenticated && <FooterComponent/>}
                </Provider>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
