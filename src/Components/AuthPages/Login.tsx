import {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../../features/api/apiSlice.ts";
import {loginSuccess} from "../../features/auth/authSlice.ts";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();
    
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result: { id : string ; username : string ; token : string; message : string } = await login({username, password}).unwrap(); // unwrap extracts response data
            dispatch(loginSuccess(result));
            setSuccess(true);
            localStorage.setItem('userdata', JSON.stringify(result));
            console.log("got result in login page: " + JSON.stringify(result));
        } catch (err) {
            console.error(err);
            setErrorMessage("An error occurred during login.");
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-[calc(65vh)] bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-700 text-center">Login</h1>

                {/* Success Message */}
                {success && (
                    <div className="p-4 mb-4 text-green-700 bg-green-100 border border-green-400 rounded">
                        Login successful! Redirecting...
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                        {errorMessage}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Username
                        </label>
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
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
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
                        Login
                    </button>
                </form>

                {/* Redirect to Signup */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}