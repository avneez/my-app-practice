import React, {useState} from 'react'

const Clock = () => {

    const[clock,setClock] = useState(0)

    const tick = () => {
        setClock(new Date().toLocaleTimeString());
    }

    setInterval(tick, 1000)

    return(
        <>
        Clock: {clock}
        </>
    )
}

export default Clock