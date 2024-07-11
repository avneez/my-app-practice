import React,{useState} from 'react'

const OTPsubmit = ({length=4, onOTPsubmit=()=>{}}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""))

  return (
    <div>OTPsubmit</div>
  )
}

export default OTPsubmit