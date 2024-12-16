import './App.css'
import Navbar from "./Components/Navbar.tsx";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import RegisterOrLogin from "./Components/AuthPages/RegisterOrLogin.tsx";
import Signup from "./Components/AuthPages/Signup.tsx";
import Login from "./Components/AuthPages/Login.tsx";
import Chats from "./Components/Chats.tsx";

function App() {

    const isAuthenticated = useSelector((state : RootState) => state.auth.isAuthenticated);

  return (
    <>
        <Router>
            <div className="flex flex-col h-screen ">
                <Navbar />
                <div className="flex-1 bg-gray-100">
                    <Routes>
                        <Route path={"/register"} element = {
                            isAuthenticated ? <Navigate to="/chats"/> : < RegisterOrLogin />
                        } />

                        <Route path={"/signup"} element = { isAuthenticated ? <Navigate to="/chats"/> : < Signup /> } />
                        <Route path={"/login"} element = { isAuthenticated ? <Navigate to="/chats"/> : < Login /> } />

                        <Route path = {"/chats"} element = { isAuthenticated ? <Chats />: <Navigate to="/register" />  } />
                    </Routes>
                </div>
            </div>
        </Router>
    </>
)
}

export default App
