import React, { useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentmessage, setcurrentmessage] = useState("");
  const sendMessage = async () => {
    if (currentmessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentmessage,
        time:
          new Date(Date.now).getHours() + ":" + new Date(Date.now).getMinutes(),
      };

      await socket.emit("send_message", messageData);
    }
  };
  return (
    <div>
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="enter message..."
          onChange={(event) => {
            setcurrentmessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default Chat;
