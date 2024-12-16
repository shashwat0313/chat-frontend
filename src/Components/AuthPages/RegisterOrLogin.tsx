import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./../../store/store.ts"

export default function RegisterOrLogin() {

    const navigate = useNavigate();

    const isAuthenticated = useSelector( (state : RootState) => state.auth.isAuthenticated );

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/chats");
        }
    })

    return (
        <>
            <div className="flex flex-col items-center justify-center bg-gray-100 min-h-[calc(65vh)]">
                {/* Information Text */}
                <h1 className="text-xl font-bold mb-6">You need to log in to use this app.</h1>

                {/* Login and Sign Up Buttons */}
                <div className="flex flex-col items-center gap-2">
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>

                    {/* 'Or' Separator */}
                    <span className="text-gray-500">or</span>

                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    )
}