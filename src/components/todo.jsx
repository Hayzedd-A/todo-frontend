import React, { useEffect, useState } from "react";
import EachTodo from "./EachTodo";
import PopUp from "./PopUp";
import Notification from "./Notification";
import { NotificationContainer } from "react-notifications";
import Signin from "./Signin";
// import { FaPlus } from "react-icons";

function Todo() {
  let [allTodo, setAllTodo] = useState(null);
  let [inputField, setInputField] = useState(false);
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [dueDate, setDueDate] = useState("");
  let [popUpState, setPopUpState] = useState([false, ""]);
  let [taskDetail, setTaskDetail] = useState("");
  let [updateNeeded, setUpdateNeeded] = useState(true);
  let [submitAction, setSubmitAction] = useState("Added");

  let localIP = "127.0.0.1";
  let networkIP = "192.168.1.2";
  let IpAddress = localIP;
  // console.log("todo function", taskID);

  async function getTodo() {
    try {
      let response = await fetch(`http://${IpAddress}:3110/todo`);
      let allTodo = await response.json();
      console.log(allTodo.data);
      setAllTodo(allTodo);
    } catch (err) {
      console.log("error", err);
    }
  }
  useEffect(() => {
    getTodo();
  }, [updateNeeded]);

  const getAllTodo = () => {
    getTodo();
    setInputField(false);
  };
  const handleSubmit = () => {
    const newTodo = JSON.stringify({
      title: title,
      body: body,
      dueDate: dueDate,
    });
    fetch(`http://${IpAddress}:3110/todo/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newTodo,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUpdateNeeded((prev) => !prev);
        setTitle("");
        setBody("");
        setDueDate("");
        if (data.status) {
          Notification("success", {
            title: "Success",
            body: "Item added successfully" + data.message,
          })();
        } else {
          Notification("error", {
            title: "Error",
            body: data.message,
          })();
        }
      })
      .catch((err) => {
        Notification("error", {
          title: "Error",
          body: err.message,
        })();
      });
  };
  const handleTaskEdit = (data) => {
    setSubmitAction("Updated");
    setInputField(true);
    console.log(data);
    setTaskDetail(data);
    setTitle(data.title);
    setBody(data.body);
    setDueDate(data.dueDate.slice(0, 10));
  };
  const handleUpdateSubmit = () => {
    let update = {};
    update.title = title;
    update.body = body;
    update.dueDate = dueDate;
    update.completed = taskDetail.completed;
    handleUpdate(update);
  };
  const handleUpdate = (data) => {
    fetch(`http://${IpAddress}:3110/todo/${taskDetail.id}/edit`, {
      method: "PATCH",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        completed: data.completed,
        dueDate: data.dueDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        data.status ? setUpdateNeeded((prev) => !prev) : console.log(data);
        Notification("success", {
          title: "Success",
          body: `Updated successfully`,
        })();
        setSubmitAction("Added");
        setTitle("");
        setBody("");
        setDueDate("");
      })
      .catch((err) => console.log("There was an error", err));
  };
  const handlePopUp = (status) => {
    if (status) {
      // handle yes
      if (popUpState[1] === "delete") {
        fetch(`http://${IpAddress}:3110/todo/${taskDetail}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status) setUpdateNeeded((prev) => !prev);
            console.log(data);
            Notification("success", {
              title: "Success",
              body: "Item deleted successfully",
            })();
          })
          .catch((err) => {
            console.log("There was an error", err);
          });
      } else {
        taskDetail.dueDate = taskDetail.dueDate.slice(0, 10);
        taskDetail.completed = taskDetail.completed ? 0 : 1;
        console.log(taskDetail);

        handleUpdate(taskDetail);
      }
    }
    setPopUpState([false, ""]);
  };
  return (
    <div className="mainContainer">
      <NotificationContainer />
      {popUpState[0] ? (
        <PopUp text={popUpState[1]} action={handlePopUp} />
      ) : null}
      <Signin />
      <nav>
        <div className="logo">My TODO</div>
        <div className="links">
          <ul>
            <li id="add" onClick={() => setInputField((prev) => !prev)}>
              New +
            </li>
            <li id="all" onClick={() => getAllTodo()}>
              All task
            </li>
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
              <input
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button
              type="submit"
              onClick={
                submitAction === "Added" ? handleSubmit : handleUpdateSubmit
              }
            >
              {submitAction === "Added" ? "ADD" : "UPDATE"}
            </button>
          </div>
        ) : null}

        <div className="taskLists">
          {allTodo ? (
            <EachTodo
              handleEdit={handleTaskEdit}
              Data={allTodo.data}
              popUp={setPopUpState}
              taskID={setTaskDetail}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Todo;
