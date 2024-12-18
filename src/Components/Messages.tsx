import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, ENDPOINT_PATHS } from "../Constants/URLs.ts";

interface Message {
    sender: string;
    text: string;
    sentAt: string;
}

interface SelfSendMessageDTO {
    chatId: string | undefined;
    text: string;
}

export default function Messages() {
    const { id } = useParams(); // Extract chat ID from route parameters
    const location = useLocation();
    const navigate = useNavigate(); // Used for programmatic navigation
    const { chatName, friendUsername } = location.state || {}; // Extract state passed from the `Link`

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    // Function to fetch messages
    const fetchMessages = () => {
        if (!id) return; // Do not proceed if chat ID is undefined
        fetch(
            BASE_URL.LOCAL_NETWORK +
            ENDPOINT_PATHS.GET_REQUEST_GET_ALL_MESSAGES_BY_CHAT_ID_AppendChatId +
            id,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        )
            .then((response) => response.json())
            .then((result) => {
                setMessages(result);
                console.log("Updated messages: " + JSON.stringify(result));
            })
            .catch((error) => console.error("Failed to fetch messages:", error));
    };

    // Initial fetch and periodic refresh
    useEffect(() => {
        fetchMessages(); // Fetch messages initially
        const interval = setInterval(() => {
            fetchMessages(); // Fetch messages every 3 seconds
        }, 3000);

        // Cleanup interval when component unmounts or ID changes
        return () => clearInterval(interval);
    }, [id]);

    // Handle sending a new message
    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;
        const sentMessage: SelfSendMessageDTO = {
            chatId: id,
            text: newMessage,
        };

        console.log("Message to be sent: " + JSON.stringify(sentMessage));

        fetch(BASE_URL.LOCAL_NETWORK + ENDPOINT_PATHS.POST_REQUEST_SEND_MESSAGE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(sentMessage),
        })
            .then((response) =>
                response.json().then((resultMessage) => {
                    console.log("Result message on send: " + JSON.stringify(resultMessage));
                    setMessages((prevMessages) => [...prevMessages, resultMessage]); // Append new message to state
                })
            )
            .catch((error) => console.error("Failed to send message:", error));

        setNewMessage(""); // Clear input
    };

    // new
    // return (
    //     <div className="flex flex-col h-full">
    //         {/* Header with Back to Chats button */}
    //         <div className="p-2 flex justify-between items-center bg-blue-500 text-white shadow-md">
    //             <div>
    //                 <h1 className="text-xl font-semibold">
    //                     {chatName}, with <span className="font-bold">{friendUsername}</span>
    //                 </h1>
    //             </div>
    //
    //             <button
    //                 onClick={() => navigate("/chats")}
    //                 className="bg-blue-700 px-3 py-1.5 rounded-md shadow-md hover:bg-blue-800"
    //             >
    //                 Back to Chats
    //             </button>
    //         </div>
    //
    //         {/* Messages display: Adjust scrolling */}
    //         <div className="flex-1 overflow-y-auto p-4 bg-gray-100 messages-container">
    //             {messages.map((message) => (
    //                 <div
    //                     key={message.sentAt}
    //                     className={`p-3 mb-2 rounded-lg shadow ${
    //                         message.sender === "you"
    //                             ? "bg-blue-500 text-white ml-auto"
    //                             : "bg-gray-300 text-black mr-auto"
    //                     } max-w-xs`}
    //                 >
    //                     <p className="text-sm">{message.sender}</p>
    //                     <p>{message.text}</p>
    //                 </div>
    //             ))}
    //         </div>
    //
    //         {/* Input box */}
    //         <div className="p-4 bg-white shadow-md flex">
    //             <input
    //                 type="text"
    //                 className="flex-1 border rounded-l-lg p-2"
    //                 placeholder="Type your message..."
    //                 value={newMessage}
    //                 onChange={(e) => setNewMessage(e.target.value)}
    //             />
    //             <button
    //                 onClick={handleSendMessage}
    //                 className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
    //             >
    //                 Send
    //             </button>
    //         </div>
    //     </div>
    // );

    // OKAY
    return (
        <div className="flex flex-col h-full">
            {/* Header with Back to Chats button */}
            <div className="p-4 flex justify-between items-center bg-blue-500 text-white shadow-md">
                {/* Chat name on the left */}
                <div>
                    <h1 className="text-xl font-semibold">
                        {chatName}, with <span className="font-bold">{friendUsername}</span>
                    </h1>
                </div>

                {/* Back to Chats button on the right */}
                <button
                    onClick={() => navigate("/chats")} // Navigate back to Chats
                    className="bg-blue-700 px-3 py-1.5 rounded-md shadow-md hover:bg-blue-800"
                >
                    Back to Chats
                </button>
            </div>

            {/* Messages display: Set a fixed height and allow internal scrolling */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100" style={{ maxHeight: "75vh" }}>
                {messages.map((message) => (
                    <div
                        key={message.sentAt}
                        className={`p-3 mb-2 rounded-lg shadow ${
                            message.sender === "you"
                                ? "bg-blue-500 text-white ml-auto"
                                : "bg-gray-300 text-black mr-auto"
                        } max-w-xs`}
                    >
                        <p className="text-sm">{message.sender}</p>
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            {/* Input box */}
            <div className="p-4 bg-white shadow-md flex">
                <input
                    type="text"
                    className="flex-1 border rounded-l-lg p-2"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

// import { useEffect, useState } from "react";
// import { useParams, useLocation } from "react-router-dom";
// import {BASE_URL, ENDPOINT_PATHS} from "../Constants/URLs.ts";
//
// interface Message {
//     sender: string;
//     text: string;
//     sentAt: string;
// }
//
// interface SelfSendMessageDTO {
//     chatId: string | undefined;
//     text: string;
// }
//
// export default function Messages() {
//     const { id } = useParams(); // Extract chat ID from route parameters
//     const location = useLocation();
//     const { chatName, friendUsername } = location.state || {}; // Extract state passed from the `Link`
//
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [newMessage, setNewMessage] = useState("");
//
//     // Fetch messages for this specific chat
//     useEffect(() => {
//         fetch(BASE_URL.LOCAL_NETWORK + ENDPOINT_PATHS.GET_REQUEST_GET_ALL_MESSAGES_BY_CHAT_ID_AppendChatId + id?.toString(), {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//         })
//             .then((response) => response.json())
//             .then((result) => {
//                 setMessages(result)
//                 console.log("messages: " + JSON.stringify(result))
//             });
//     }, [id]);
//
//     // Handle sending a new message
//     const handleSendMessage = () => {
//         if (newMessage.trim() === "") return;
//         const sentMessage: SelfSendMessageDTO = {
//             chatId: id,
//             text: newMessage,
//         };
//
//         console.log("message to be sent: " + JSON.stringify(sentMessage));
//
//         // setMessages([...messages, sentMessage]); // Optimistically update
//         fetch(BASE_URL.LOCAL_NETWORK + ENDPOINT_PATHS.POST_REQUEST_SEND_MESSAGE, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify(sentMessage),
//         }).then((response) =>
//             response.json().then((resultMessage) => {
//                 console.log("result message on send: " + JSON.stringify(resultMessage))
//                 setMessages([...messages, resultMessage]);
//             })
//         );
//
//         setNewMessage(""); // Clear input
//     };
//
//     return (
//         <div className="flex flex-col h-full">
//             {/* Header indicating the chat name */}
//             <div className="p-4 bg-blue-500 text-white shadow-md">
//                 <h1 className="text-xl font-semibold">
//                     {chatName}, with <span className="font-bold">{friendUsername}</span>
//                 </h1>
//             </div>
//
//             {/* Messages display */}
//             <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
//                 {messages.map((message) => (
//                     <div
//                         key={message.sentAt}
//                         className={`p-3 mb-2 rounded-lg shadow ${
//                             message.sender === "you" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"
//                         } max-w-xs`}
//                     >
//                         <p className="text-sm">{message.sender}</p>
//                         <p>{message.text}</p>
//                     </div>
//                 ))}
//             </div>
//
//             {/* Input box */}
//             <div className="p-4 bg-white shadow-md flex">
//                 <input
//                     type="text"
//                     className="flex-1 border rounded-l-lg p-2"
//                     placeholder="Type your message..."
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                 />
//                 <button
//                     onClick={handleSendMessage}
//                     className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
//                 >
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }