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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .catch(error => {
        console.log(error);
      });

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

  const onOTPsubmit = () => {
    console.log("submit");
  };

  return (
    <div>
      <div><h1>Login</h1></div>
      <div style={{ display: "flex", width: "300px", flexDirection: "column", gap: "10px", padding: "10px" }}>
        <div>Username: <input id="username" name="username" type="text" value={userData.username} onChange={handleChange} /></div>
        <div>Password: <input id="password" name="password" type={showPassword ? "text" : "password"} value={userData.password} onChange={handleChange} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label htmlFor="check">Show Password
            <input
              id="check"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
          </label>
        </div>
        <div>Mobile Number: <input id="mobile" name="mobileNumber" type="tel" value={userData.mobileNumber} onChange={handleChange} /></div>
        <OTPsubmit length={4} onOTPsubmit={onOTPsubmit} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleLogin}>Login</button>
        </div>
        {validationError && <div style={{ color: 'red', display: "flex", justifyContent: "center" }}>{validationError}</div>}
      </div>
    </div>
  )
}

export default Login