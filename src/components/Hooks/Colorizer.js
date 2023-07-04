import React,{useState} from 'react'
import '../Hooks/Colorizer.css'

export default function Colorizer() {
    const [color,setColor] = useState('#000000')

    const getRandomColor = () => {
        // generate random hex
        const randomC = `#${Math.floor(Math.random()*16777215).toString(16)}`
        return randomC
    }

    const changeColor = () =>{
        const randomColor = getRandomColor()
        setColor(randomColor)
    }

  return (
    <div className='colorizer'>
    <div className='box' style={{backgroundColor: color}}>{color}</div>
    <button onClick={changeColor}>Change Color</button>
    </div>
  )
}
