import { createContext, useState } from "react";
import "./App.css";
import "./style.css";
import Accordion from "./components/Accordion";
import Accordion2 from "./components/Accordion2";
import Todo from "./components/todo";
import Notification from "./components/Notification";
import Signin from "./components/Signin";

const UserContext = createContext();
function App() {
  const [user, setUser] = useState({ surname: "Adebayo", firstname: "Azeez" });
  return (
    <div className="App">
      <Todo />
      {/* <Notification /> */}
    </div>
  );
}

export default App;
