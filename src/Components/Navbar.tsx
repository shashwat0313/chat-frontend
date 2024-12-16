// import { Link } from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {useEffect} from "react";
import {logout} from "../features/auth/authSlice.ts";

export default function Navbar() {

    const auth = useSelector((state : RootState) => state.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log( "navbar state: " + JSON.stringify(auth))
    }, []);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <div>
            <header className="w-full bg-gray-900 text-white py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/*<Link to="/">*/}
                        <div className="text-2xl font-bold">{auth.isAuthenticated && auth.username && "Hi, "+ auth.username }</div>
                    {/*</Link>*/}
                    <nav className='ml-4'>
                        <ul className="flex space-x-2">

                            { auth.isAuthenticated && <li> <button onClick={logoutHandler}>Logout </button> </li>}
                            {/*below to be used for user details and all*/}
                            {/*<li><Link to="/works" className="hover:text-gray-400">Works</Link></li>*/}
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    )
}