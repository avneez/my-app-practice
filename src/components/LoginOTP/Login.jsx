import React, { useState } from 'react';
import OTPsubmit from './OTPsubmit';

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    mobileNumber: "",
  });
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpInputField, setOtpInputField] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!validationCheck()) {
      return;
    }

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Handle success
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    })

    setUserData({
      username: "",
      password: "",
      mobileNumber: "",
    });

    
    setTimeout(() => {
      alert("Logged In Successfully");
    }, 300);
  };

  const validationCheck = () => {
    const { username, password, mobileNumber } = userData;
    if (!username) {
      setValidationError("Username is required");
      return false;
    }
    if (!password) {
      setValidationError("Password is required");
      return false;
    }
    if (!mobileNumber) {
      setValidationError("Mobile Number is required");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleMobileSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g
    if(userData.mobileNumber.length < 10 || regex.test(userData.mobileNumber)){
      alert("Invalid Mobile Number")
      return
    } else {
      //Call BE API
      setOtpInputField(true)
    }
  }

  const onOTPsubmit = (otp) => {
    const isInvalid = otp.some(item => item === '');
    if (isInvalid) {
      alert("Invalid OTP");
      return;
    }

    setTimeout(() => {
      alert("OTP Submitted successfully");
    }, 300);
  };

  return (
    <div>
      <div style={{marginLeft: "10px"}}><h1>Login</h1></div>
      <div className='formContainer'>
        <div className='inputItem'>Username: <input className='inputField' id="username" name="username" type="text" value={userData.username} onChange={handleChange} /></div>
        <div className='inputItem'>Password: <input className='inputField' id="password" name="password" type={showPassword ? "text" : "password"} value={userData.password} onChange={handleChange} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label htmlFor="check" className='checkBox'>
              Show Password
            <input
              className='inputField'
              id="check"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </label>
        </div>
        <div className='inputItem'>Mobile Number: <input className='inputField' id="mobile" name="mobileNumber" type="tel" value={userData.mobileNumber} onChange={handleChange} /></div>
        <span><button onClick={handleMobileSubmit}> Send OTP</button></span>
        {otpInputField && 
          (
            <>
              <div>Enter OTP send to {userData.mobileNumber}</div>
              <OTPsubmit length={4} onOTPsubmit={onOTPsubmit} />
            </>
          )
        }
        <div style={{ display: "flex", justifyContent: "center", marginTop:"50px" }}>
          <button onClick={handleLogin} style={{width:"100%"}}>Login</button>
        </div>
        {validationError && <div style={{ color: 'red', display: "flex", justifyContent: "center" }}>{validationError}</div>}
      </div>
    </div>
  )
}

export default Login