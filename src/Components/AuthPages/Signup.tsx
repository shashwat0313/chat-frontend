import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../../Constants/URLs.ts";

const SignupPostEndpoint = BASE_URL.LOCAL_NETWORK + "/auth/signup";

export default function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignup = async (e : React.FormEvent) => {
        e.preventDefault();
        try {
            axios.post(SignupPostEndpoint, {username, password}).then((response)=>{
                if (response.status === 200 || response.status === 201) {
                    setSuccess(true);

                }
                else {
                    setErrorMessage("Some error occured");
                    console.log("Error: " + response)
                }
            })
        } catch (err) {
            console.log("exception: " + err)
            setErrorMessage("Some error occured");
        }
    }

    return (
        <>
            <div className="flex flex-col items-center bg-gray-100 justify-center min-h-[calc(65vh)]">
                <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">Sign Up</h1>

                    {success && (
                        <div className="p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
                            Sign up successful! <Link to="/login" className="text-blue-500 underline">Go to Login</Link>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label htmlFor="username"
                                   className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}