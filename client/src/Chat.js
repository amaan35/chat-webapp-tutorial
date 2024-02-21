import React, { useState, useEffect } from "react";

const Chat = ({ socket, username, room }) => {
  const [currentmessage, setcurrentmessage] = useState("");
  const [messageList, setmessageList] = useState([]);

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
      setmessageList((prevList) => [...prevList, messageData]);
      setcurrentmessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setmessageList((prevList) => [...prevList, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageData) => {
            return (
              <div
                className="message"
                id={username === messageData.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageData.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageData.time}</p>
                    <p id="author">{messageData.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentmessage}
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
