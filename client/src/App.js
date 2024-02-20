import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setusername] = useState("");
  const [room, setroom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <div className="App">
      <h3>Join a room</h3>
      <input
        type="text"
        placeholder="your name"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="room id"
        onChange={(event) => {
          setroom(event.target.value);
        }}
      />
      <button>Join the room</button>
    </div>
  );
}

export default App;
