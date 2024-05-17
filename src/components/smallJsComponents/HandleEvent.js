import React, { useState } from 'react'
import Welcome from './Welcome'

const HandleEvent = () => {
const[text, setText] = useState('text')

    const changeEvent = () =>{
        setText('Britani')
    }

    return(<>
    <button onClick={changeEvent}>Click</button>
    <div><Welcome/></div>
    </>
    )
}

export default HandleEvent