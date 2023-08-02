import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = ({ user, socket }) => {
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    const eventListener = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket && socket.on("recieve_message", eventListener);

    return () => socket && socket.off("recieve_message", eventListener);
  }, [socket]);

  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      {messageList}
      <div>
        <button
          onClick={async () => {
            if (socket) {
              socket.emit("join_room", 1);
            }
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Chat;
