import React, { useEffect, useState } from "react";
import EachTodo from "./EachTodo";
// import { FaPlus } from "react-icons";

function Todo() {
  let [allTodo, setAllTodo] = useState(null);
  let [inputField, setInputField] = useState(false);
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  console.log("todo function");
  useEffect(() => {
    async function getTodo() {
      try {
        let response = await fetch("http://127.0.0.1:8080");
        let allTodo = await response.json();
        console.log(allTodo.data);
        setAllTodo(allTodo);
      } catch (err) {
        console.log("error", err);
      }
    }
    getTodo();
  }, []);
  const handleSubmit = () => {
    const newTodo = JSON.stringify({
      title: title,
      description: body,
      // dueDate: dueDate,
    });
  };
  return (
    <div className="mainContainer">
      <nav>
        <div className="logo">My TODO</div>
        <div className="links">
          <ul>
            <li id="add" onClick={() => setInputField((prev) => !prev)}>
              New +
            </li>
            <li id="all">All task</li>
            <li>Done</li>
          </ul>
        </div>
      </nav>
      <div className="taskContainer">
        {inputField ? (
          <div className="inputs">
            <label htmlFor="title">
              Title:
              <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="date">
              Due Date:
              <input type="date" placeholder="Due Date" />
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type="submit" onClick={handleSubmit}>
              ADD
            </button>
          </div>
        ) : null}

        <div className="taskLists">
          {allTodo ? <EachTodo Data={allTodo.data} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Todo;
