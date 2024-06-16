import React, { useState } from "react";
import { BiSelectMultiple, BiSelection, BiSave } from "react-icons/bi";
import { FaMarker, FaTrash } from "react-icons/fa";

// import Data from "../../Datas/accordionData";
// import "./styles.css";

function EachTodo({ Data, popUp, taskID }) {
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
  const handleTaskClick = (id, text) => {
    popUp([true, text]);
    taskID(id);
  };
  return (
    <div
      className="accordion"
      style={{
        // minHeight: "100vh",
        // backgroundColor: "#54242a",
        // color: "white",
        padding: "1em",
      }}
    >
      <h1>My Todos</h1>
      <ul>
        {Data.map((ele) => (
          <li
            key={ele.id}
            className={"item_" + ele.id}
            style={{
              height: newHeight,
            }}
          >
            <div className="title" onClick={() => HandleListClick(ele.id)}>
              <h2>{ele.title}</h2>
              <div className="action">
                <span className="dateDetail">
                  <span>
                    Created: {ele.createdDate.replace("T", "  @ ").slice(0, -5)}
                  </span>
                  <span>Due: {ele.dueDate}</span>
                </span>
                <FaTrash
                  fill="darkred"
                  size={"1.4em"}
                  onClick={() => handleTaskClick(ele.id, "delete")}
                ></FaTrash>
                <BiSelectMultiple
                  fill="green"
                  size={"1.4em"}
                  onClick={() => handleTaskClick(ele.id, "mark as complete")}
                ></BiSelectMultiple>
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
