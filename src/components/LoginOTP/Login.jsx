import React,{useState} from 'react'
import OTPsubmit from './OTPsubmit'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [validationError, setValidationError] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleMobileNumber = (event) => {
    setMobileNumber(event.target.value);
  };
  
  const handleLogin = (event) => {
    event.preventDefault();
    if(!validationCheck()){
      return;
    };

    const payload = {
      username: username,
      password: password,
      mobileNumber: mobileNumber,
    };

    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((response) => response.json())
    .catch(error => {
      console.log(error)
    });

    setUsername("")
    setPassword("")
    setMobileNumber("")
  };

  const validationCheck = () => {
    if (!username) {
      setValidationError("Username is required");
      return false;
    }
    if (!password) {
      setValidationError("Password is required");
      return false;
    }
    setValidationError("");
    return true;
  };

  const onOTPsubmit = () =>{
    console.log("submit")
  }

  return (
    <div>
      <div><h1>Login</h1></div>
      <div style={{display:"flex", width:"300px", flexDirection:"column", gap:"10px", padding:"10px"}}>
        <div>Username: <input id="username" type="text" value={username} onChange={handleUsername}/></div>
        <div>Password: <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={handlePassword}/></div>
        <div style={{display:"flex", alignItems: "center", gap: "5px"}}>
          <label for="check">Show Password
            <input
              id="check"
              type="checkbox"
              value={showPassword}
              onChange={() =>
                setShowPassword((prev) => !prev)
              }
            />
          </label>
        </div>
        <div>Mobile Number: <input id="mobile" type="tel" value={mobileNumber} onChange={handleMobileNumber}/></div>
        <OTPsubmit length={4} onOTPsubmit={onOTPsubmit} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleLogin}>Login</button>
        </div>
        {validationError && <div style={{ color: 'red', display:"flex", justifyContent:"center" }}>{validationError}</div>}
      </div>
    </div>
  )
}

export default Login