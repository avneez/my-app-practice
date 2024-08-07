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
  const [otp, setOtp] = useState(new Array(4).fill(""));


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

    if (!validateOtp()) {
      setValidationErrorWithTimeout("Invalid OTP");
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
    setOtp([])

    setTimeout(() => {
      alert("Logged In Successfully");
    }, 300);
  };

  const setValidationErrorWithTimeout = (message) => {
    setValidationError(message);
    setTimeout(() => {
      setValidationError("");
    }, 3000);
  };
  
  const validationCheck = () => {
    const { username, password, mobileNumber } = userData;
    if (!username) {
      setValidationErrorWithTimeout("Username is required");
      return false;
    }

    if (password) {
      if (password.length < 8) {
        setValidationErrorWithTimeout("Password must be at least 8 characters long");
        return false;
      }
    }
    else {
      setValidationErrorWithTimeout("Password is required");
      return false;
    } 

    if (mobileNumber) {
      const regex = /[^0-9]/g
      if(mobileNumber.length < 10 || regex.test(mobileNumber)){
        setValidationErrorWithTimeout("Invalid Mobile Number");
        return false;
      }
    } else {
      setValidationErrorWithTimeout("Mobile Number is required");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleMobileSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g
    if(userData.mobileNumber.length < 10 || regex.test(userData.mobileNumber)){
      setValidationErrorWithTimeout("Invalid Mobile Number")
      return
    } else {
      //Call BE API
      setOtpInputField(true)
    }
  }

  const validateOtp = () => {
    const isInvalid = otp.some(item => item === '') || otp.length !== 4;
    if (isInvalid) {
      return false;
    }
    setOtpInputField(false);
    return true
  }

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
        <span><button onClick={handleMobileSubmit}>Send OTP</button></span>
        {otpInputField && 
          (
            <>
              <div>Enter OTP send to {userData.mobileNumber}</div>
              <OTPsubmit length={4} setOtp={setOtp} />
            </>
          )
        }
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleLogin} style={{width:"100%"}}>Login</button>
        </div>
        {validationError && <div className='errorText'>{validationError}</div>}
      </div>
    </div>
  )
}

export default Login