import React from "react";

function PopUp({ text, action }) {
  return (
    <div className="popUp background">
      <div className="container">
        <h3>Do you want to {text}</h3>
        <button onClick={() => action(true)} id="yes">
          Yes
        </button>
        <button onClick={() => action(false)}>No</button>
      </div>
    </div>
  );
}

export default PopUp;
