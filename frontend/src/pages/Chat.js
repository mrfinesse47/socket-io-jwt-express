import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Chat = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return <div>Chat</div>;
};

export default Chat;
