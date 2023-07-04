import React, { useState, useEffect } from 'react';

export default function Add() {
  let x = 5, y = 5;
  return (
    <>{x + y}</>
  );
}


export function CounterP() {
  const [count, setCount] = useState(0);

  function countF() {
    // setCount(count + 1)
    setCount((prev)=> {
    console.log(prev)
    return prev+1
  })

  }

  // useEffect(() => {
  //   document.title = `You clicked ${count} times`;
  //   localStorage.setItem(count)
  // });



  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={countF}>
        Click me
      </button>
    </div>
  );
}