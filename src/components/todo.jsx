import React, { useEffect, useState } from "react";
import EachTodo from "./EachTodo";
import PopUp from "./PopUp";
import Notification from "./Notification";
import { NotificationContainer } from "react-notifications";
import Signin from "./Signin";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
// import { FaPlus } from "react-icons";

function Todo() {
  let [allTodo, setAllTodo] = useState([]);
  let [inputField, setInputField] = useState(false);
  let [title, setTitle] = useState("");
  let [body, setBody] = useState("");
  let [dueDate, setDueDate] = useState("");
  let [popUpState, setPopUpState] = useState([false, ""]);
  let [taskDetail, setTaskDetail] = useState("");
  let [updateNeeded, setUpdateNeeded] = useState(true);
  let [submitAction, setSubmitAction] = useState("Added");
  let [seasionID, setSeasionID] = useState(() => localStorage.getItem("todo"));
  let [ipAddress, setIpAddress] = useState(
    // "https://todo-kpsdvesez-hayzeddas-projects.vercel.app"
    "http://127.0.0.1:3130"
    // "http://192.168.1.3:3130"
  );
  let [isLoading, setLoading] = useState();
  let [userID, setUserID] = useState(() => {
    if (seasionID) return seasionID.split("-")[1];
  });

  async function getTodo() {
    setLoading(true);
    try {
      console.log(userID);
      let response = await fetch(`${ipAddress}/todo/${userID}`);
      console.log(userID);
      let allTodo = await response.json();
      console.log(allTodo);
      setAllTodo(allTodo.data);
      setLoading(false);
    } catch (err) {
      console.log("error", err);
      setLoading(false);
    }
  }
  useEffect(() => {
    console.log(userID);
    getTodo();
  }, [updateNeeded]);

  const setSignup = ({ id, seasionID, username }) => {
    localStorage.setItem("todo", seasionID);
    setSeasionID(seasionID);
    setUserID(id);
    console.log(seasionID);
    setUpdateNeeded((prev) => !prev);
  };

  const getAllTodo = () => {
    getTodo();
    setInputField(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newTodo = JSON.stringify({
        title: title,
        body: body,
        dueDate: dueDate,
      });
      let response = await fetch(`${ipAddress}/todo/${userID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newTodo,
      });
      let data = await response.json();
      console.log(data);
      setUpdateNeeded((prev) => !prev);
      setTitle("");
      setBody("");
      setDueDate("");
      if (!data.status) throw new Error(data.message);
      Notification("success", {
        title: "Success",
        body: data.message,
      })();
    } catch (error) {
      Notification("error", {
        title: "Error",
        body: error.message,
      })();
    }
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
    setLoading(true);
    let update = {};
    update.title = title;
    update.body = body;
    update.dueDate = dueDate;
    update.completed = taskDetail.completed;
    handleUpdate(update);
  };

  const handleUpdate = async (data) => {
    try {
      let response = await fetch(`${ipAddress}/todo/edit/${taskDetail.id}`, {
        method: "PATCH",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          completed: data.completed,
          dueDate: data.dueDate,
        }),
      });
      let result = await response.json();
      if (!result.status) throw new Error(result.message);
      setUpdateNeeded((prev) => !prev);
      Notification("success", {
        title: "Success",
        body: `Updated successfully`,
      })();
      setLoading(false);
      setSubmitAction("Added");
      setTitle("");
      setBody("");
      setDueDate("");
      return true;
    } catch (error) {
      Notification("success", {
        title: "Success",
        body: error.message,
      })();
      // setUpdateNeeded((prev) => !prev);
    }
  };

  const handlePopUp = async (status) => {
    try {
      if (status) {
        setLoading(true);
        // handle yes
        if (popUpState[1] === "delete") {
          let response = await fetch(`${ipAddress}/todo/${taskDetail}`, {
            method: "DELETE",
          });
          let result = await response.json();
          if (!result.status) throw new Error(result.status);
          setUpdateNeeded((prev) => !prev);
          console.log(result);
          setLoading(false);
          Notification("success", {
            title: "Success",
            body: "Item deleted successfully",
          })();
        } else {
          taskDetail.dueDate = taskDetail.dueDate.slice(0, 10);
          taskDetail.completed = taskDetail.completed ? 0 : 1;
          console.log(taskDetail);

          handleUpdate(taskDetail);
        }
      }
      setPopUpState([false, ""]);
    } catch (error) {
      Notification("error", {
        title: "error",
        body: error.message,
      })();
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("todo");
    setSeasionID(undefined);
    setUserID(undefined);
    setUpdateNeeded((prev) => !prev);
  };
  return (
    <div className="mainContainer">
      <NotificationContainer />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              fontSize: "3em",
              translateX: "-50%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AiOutlineLoading size={"3em"} className="loadingAnimation" />
          </motion.div>
        )}
      </AnimatePresence>
      {popUpState[0] ? (
        <AnimatePresence>
          <motion.div
            style={{ position: "absolute" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PopUp text={popUpState[1]} action={handlePopUp} />
          </motion.div>
        </AnimatePresence>
      ) : null}
      {seasionID ? null : (
        <Signin ipAddress={ipAddress} setSeasion={setSignup} />
      )}
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
            <li onClick={handleSignOut}>{seasionID ? "Log out" : "Log in"}</li>
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
          {allTodo.length ? (
            <EachTodo
              handleEdit={handleTaskEdit}
              Data={allTodo}
              popUp={setPopUpState}
              taskID={setTaskDetail}
            />
          ) : (
            <h1>You do not have any post yet</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
