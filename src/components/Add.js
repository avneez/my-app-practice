import React, { useState, useEffect } from 'react';

export default function Add() {
  let x = 5, y = 5;
  return (
    <>{x + y}</>
  );
}


export function Example() {
  const [count, setCount] = useState(0);

  function countF() {
    setCount(count + 1)
  }

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={countF}>
        Click me
      </button>
    </div>
  );
}