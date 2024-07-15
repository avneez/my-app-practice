import React,{useEffect, useRef, useState} from 'react'
import './styles.css'

const OTPsubmit = ({length=4, onOTPsubmit=()=>{}}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""))
    const [activeIndex, setActiveIndex] = useState(0)
    console.log('otp',otp)
    const ref = useRef()

    const handleChange = (event,index) =>{
        const arr = [...otp];
        arr[index] = event.target.value
        setOtp(arr)
    }
    const handleClick = () =>{}
    const handleKeyDown = (event) =>{
        console.log(event, 'back')
        if(event.key==="Backspace" && activeIndex >= 0){
            setActiveIndex(activeIndex-1)
        }
       else if(activeIndex<length-1){
            setActiveIndex(activeIndex+1)
        }
    }

    useEffect(()=>{
        if(activeIndex>=0){
            ref.current.focus()
        }
    },[activeIndex])

  return (
    <div>
    {otp.map((value,index)=>{
        return <input
            className='otpInput'
            key={index}
            type="text"
            value={value}
            onChange={(e)=>handleChange(e,index)}
            onKeyDown={(e)=>handleKeyDown(e, index)}
            ref={index===activeIndex ? ref : null}
        />
    })}
    </div>
  )
}

export default OTPsubmit