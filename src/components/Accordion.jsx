import React, { useContext } from "react";
import { useState } from "react";
import Data from "./data";

function Accordion({ children }) {
  // const user = useContext(UserContext);
  const [selected, setSelected] = useState(null);

  const handleSingleSelection = (id) => {
    setSelected(id === selected ? null : id);
  };

  return (
    <div className="container">
      {Data.map((data) => (
        <div className="accordion">
          <h3 onClick={() => handleSingleSelection(data.id)}>
            {data.question}
          </h3>
          <span>+</span>
          {data.id == selected ? (
            <p className="answer ">{data.answer}</p>
          ) : null}
        </div>
      ))}
      <div className="children">
        {children}
        {/* <h1>{user.name}</h1> */}
      </div>
    </div>
  );
}

export default Accordion;
