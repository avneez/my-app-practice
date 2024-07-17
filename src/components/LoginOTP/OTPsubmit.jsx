import React,{useEffect, useRef, useState} from 'react'
import './styles.css'

const OTPsubmit = ({length=4, setOtp}) => {
    const [otp, setLocalOtp] = useState(new Array(length).fill(""))
    const ref = useRef([])

    useEffect(()=>{
        if(ref.current[0]){
            ref.current[0].focus()
        }
     },[])

    const handleChange = (event,index) => { 
        const value = event.target.value
        if(isNaN(value)) return

        //instead of directly mutating the state, a new modified version of the state is created and set.
        const newOtp = [...otp]
        //allow only 1 input
        newOtp[index] = value.substring(value.length-1)
        setLocalOtp(newOtp)
        setOtp(newOtp)

        //move forward automatically in the input field
        if(value && index < length-1 && ref.current[index+1]){
            ref.current[index+1].focus()
        }
    }

    const handleClick = (index) =>{
        //automatically move the cursor to the right of input
        ref.current[index].setSelectionRange(1,1)
    }

    const handleKeyDown = (event, index) =>{
        if(event.key==="Backspace" && !otp[index] && index > 0 && ref.current[index-1]){
            ref.current[index-1].focus()
        } 
    }

    return (
        <div>
            <div>
                {otp.map((value, index) => {
                    return <input
                        className='otpInput'
                        key={index}
                        type="text"
                        value={value}
                        onClick={() => handleClick(index)}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={input => ref.current[index] = input}
                    />
                })}
            </div>
        </div>
    )
}

export default OTPsubmit