import React, { useState, useEffect } from "react";

function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleCountChange = () => {
      console.log(`Previous count: ${count}`);
    };

    handleCountChange();
  }, [count]); // Run effect whenever count changes

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1); // Use functional form of setState
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

export default ExampleComponent;
