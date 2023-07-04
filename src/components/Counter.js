import React, { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(prevCount => {
      const newCount = Number(prevCount) + 1;
      localStorage.setItem("count", newCount);
      return newCount;
    });
  };

  const decrease = () => {
    setCount(prevCount => {
      const newCount = Number(prevCount) - 1;
      localStorage.setItem("count", newCount);
      return newCount;
    });
  };

  useEffect(() => {
    const initialValue = localStorage.getItem("count");
    if (initialValue) setCount(initialValue);
  }, []);


  console.log(localStorage.getItem("count"));

  return (
    <div>
      <button onClick={increase}>Plus</button>
      <button onClick={decrease}>Minus</button>
      <div>{count}</div>
    </div>
  );
  }
  export default Counter