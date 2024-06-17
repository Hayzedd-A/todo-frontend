import React, { useState } from "react";
import { BiSelectMultiple, BiSelection, BiSave } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";

function EachTodo({ Data, popUp, taskID, handleEdit }) {
  let [selectionType, setSelectionType] = useState(["Multiple", "Single"]);
  let [selected, setSelected] = useState(null);
  let [selectedItems, setSelectedItem] = useState([]);
  let [newHeight, setnewHeight] = useState("");

  const HandleListClick = (id) => {
    if (selectionType[0] === "Single") {
      selectedItems.includes(id)
        ? setSelectedItem(selectedItems.filter((a) => a !== id))
        : setSelectedItem([...selectedItems, id]);
    } else selected === id ? setSelected(null) : setSelected(id);
    setnewHeight("max-content");
  };
  const handleTaskClick = (data, text) => {
    // handleEdit(id);
    popUp([true, text]);
    taskID(data);
  };
  return (
    <div
      className="accordion"
      style={{
        padding: "1em",
      }}
    >
      <h1>My Todos</h1>
      <ul>
        {Data.map((ele) => (
          <li
            key={ele.id}
            className={
              ele.completed ? `item_${ele.id} completed` : "item_" + ele.id
            }
          >
            <div className="title" onClick={() => HandleListClick(ele.id)}>
              <h2>{ele.title}</h2>
              <div className="action">
                <span className="dateDetail">
                  <span>
                    Created: {ele.createdDate.replace("T", "  @ ").slice(0, -5)}
                  </span>
                  <span>
                    Due:{" "}
                    {ele.completed ? "Completed" : ele.dueDate.slice(0, 10)}
                  </span>
                </span>
                <BiSelectMultiple
                  className="actionIcon select"
                  fill="green"
                  size={"1.4em"}
                  onClick={() =>
                    handleTaskClick(
                      ele,
                      ele.completed ? "mark as incomplete" : "mark as complete"
                    )
                  }
                ></BiSelectMultiple>
                <FaEdit
                  fill="green"
                  size={"1.4em"}
                  onClick={() => {
                    handleEdit(ele);
                    taskID(ele);
                  }}
                />
                <FaTrash
                  className="actionIcon trash"
                  fill="darkred"
                  size={"1.4em"}
                  onClick={() => handleTaskClick(ele.id, "delete")}
                ></FaTrash>
              </div>
            </div>
            <div className="content">
              {selectionType[0] === "Single" ? (
                <p>{selectedItems.includes(ele.id) ? ele.body : null}</p>
              ) : (
                <p>{selected === ele.id ? ele.body : null}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EachTodo;
