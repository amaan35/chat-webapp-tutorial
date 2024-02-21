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
      setmessageList((prevList)=>[...prevList, messageData]);

    }
  };
  useEffect(() => {
    socket.on("receive_message", (data)=>{
        setmessageList((prevList)=>[...prevList, data]);
    })
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageData)=>{
            return <h3>{messageData.message}</h3>
        })}
      </div>
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
