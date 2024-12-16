import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {BASE_URL, ENDPOINT_PATHS} from "../Constants/URLs.ts";

export default function Chats() {

    interface Chat {
        chatName: string;
        friendUsername: string | null; // Null for group chats
    }
    // const chats = [
    //     { chatName: "Team Project A", friendUsername: null },
    //     { chatName: "Personal", friendUsername: "john_doe" },
    //     { chatName: "Work Group", friendUsername: null },
    //     { chatName: "Personal", friendUsername: "jane_smith" },
    // ];

    interface newChatDTO{
        chatName: string;
        friendUsername: string;
    }
    const [chats, setChats] = useState<Chat[]>([])

    useEffect(()=>{
        fetch(BASE_URL.LOCAL_NETWORK + ENDPOINT_PATHS.GET_REQUEST_GET_ALL_CHATS_AppendUserId + auth.id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            }).then((response) => {
                console.log("get all chats response: " + JSON.stringify(response))
                response.json().then((result)=>{
                    setChats(result)
                    console.log("result from get all chats json: " + JSON.stringify(result))
                })
            })
    }, [])

    const auth = useSelector((state : RootState) => state.auth)

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [chatName, setChatName] = useState(""); // Input for chat name
    const [friendName, setFriendName] = useState(""); // Input for friend's name

    function handleSubmit(e) {
        e.preventDefault();

    //     we have the chat name and the friend user name
        const newChat: newChatDTO = {
            chatName: chatName,
            friendUsername: friendName
        }
        console.log("newChat: " + JSON.stringify(newChat))

        const apiUrl = BASE_URL.LOCAL_NETWORK + ENDPOINT_PATHS.CREATE_CHAT

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token')
            },
            body: JSON.stringify(newChat)
        }).then(response => {
            console.log("response from server for create chat: " + JSON.stringify(response))

            setChats([...chats, newChat])

            if(response.status === 200){
                console.log("response status is 200")
                setIsOverlayOpen(false);
                setChatName("");
                setFriendName("");
            }
        })
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Chats</h1>
                {/* Plus Button for opening the overlay */}
                <button
                    onClick={() => setIsOverlayOpen(true)}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded-full shadow hover:bg-blue-600"
                >
                    New Chat
                </button>
            </div>
            <ul className="space-y-3">
                {chats.map((chat, index) => (
                    <li
                        key={index}
                        className="border p-3 rounded-lg shadow bg-gray-100 hover:bg-gray-200"
                    >
                        <p className="text-lg font-medium">{chat.chatName}</p>
                        {chat.friendUsername && (
                            <p className="text-gray-600">
                                with <span className="font-bold">{chat.friendUsername}</span>
                            </p>
                        )}
                    </li>
                ))}
            </ul>

            {/* Overlay for the Create Chat Form */}
            {isOverlayOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsOverlayOpen(false);
                    }}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl font-bold mb-4">Create New Chat</h2>
                        <form>
                            <div className="mb-4">
                                <label
                                    htmlFor="chat-name"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Chat Name
                                </label>
                                <input
                                    id="chat-name"
                                    type="text"
                                    value={chatName}
                                    onChange={(e) => setChatName(e.target.value)}
                                    className="mt-1 block w-full p-2 border rounded-lg"
                                    placeholder="Enter chat name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="friend-name"
                                    className="block text-sm font-medium text-gray-600"
                                >
                                    Friend's Username
                                </label>
                                <input
                                    id="friend-name"
                                    type="text"
                                    value={friendName}
                                    onChange={(e) => setFriendName(e.target.value)}
                                    className="mt-1 block w-full p-2 border rounded-lg"
                                    placeholder="Enter friend's username"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOverlayOpen(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}