import React, { useState } from "react";
// import Data from "./data";

function Accordion2({ Data }) {
  let [selected, setSelected] = useState(null);
  const clickHandler = (id) => {
    setSelected(id);
  };

  return (
    <div>
      {Data.map((data) => (
        <div className="accordion" key={data.id}>
          <div className="header" onClick={() => clickHandler(data.id)}>
            <h3>{data.title}</h3>
            <span>+</span>
          </div>
          {data.id === selected ? (
            <div className="content">{data.description}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Accordion2;
