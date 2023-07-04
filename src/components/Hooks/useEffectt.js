import { useState,useEffect } from "react"


export default function UseEffectt() {
  const [resourceType, setResourceType] = useState('posts')
  const [items, setItems] = useState([])

  console.log('render')

  useEffect(()=>{
    // console.log('resource type changed')
    fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then(res => res.json())
    .then(json=> console.log(json))
  },[resourceType]) //will only console when the resource type changes and empty array never actually changes between different renders

  // useEffect(()=>{
  //   console.log('on Mount')
  // },[])

  return (
    <>
    <div>
      <button onClick={()=> setResourceType('posts')}>Posts</button>
      <button onClick={()=> setResourceType('users')}>Users</button>
      <button onClick={()=> setResourceType('comments')}>Comments</button>
    </div>
    <h1>{resourceType}</h1>
    {/* {items.map} */}
    </>
  )
}
