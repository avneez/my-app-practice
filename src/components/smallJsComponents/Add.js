import React from 'react'

const Add = (a,b) => {
  return a+b
}

export const subtract = (a,b) => {
    if(a>b) return  a-b
    else return b-a
}

export default Add