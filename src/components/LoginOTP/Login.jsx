import React,{useState} from 'react'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [validationError, setValidationError] = useState("")
  
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const handleLogin = (event) => {
    event.preventDefault();
    if(!validationCheck()){
      return;
    };

    const payload = {
      username: username,
      password: password,
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

  return (
    <div>
      <div><h1>Login</h1></div>
      <div style={{display:"flex", width:"300px", flexDirection:"column", gap:"10px", padding:"10px"}}>
        <div>Username: <input type="text" value={username} onChange={handleUsername}/></div>
        <div>Password: <input type="password" value={password} onChange={handlePassword}/></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={handleLogin}>Login</button>
        </div>
        {validationError && <div style={{ color: 'red', display:"flex", justifyContent:"center" }}>{validationError}</div>}
      </div>
    </div>
  )
}

export default Login