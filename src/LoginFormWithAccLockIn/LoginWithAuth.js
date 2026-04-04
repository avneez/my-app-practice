import { useState, useEffect } from "react";

const LoginWithAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timer, setTimer] = useState(30);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load remembered user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUsername(savedUser);
    }
  }, []);

  // Countdown logic for lockout
  useEffect(() => {
    let interval;
    if (isLocked && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsLocked(false);
      setAttempts(0);
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [isLocked, timer]);

  // Password strength
  const checkStrength = (pwd) => {
    if (pwd.length < 8) return "Weak";
    if (/[A-Z]/.test(pwd) && /\d/.test(pwd)) return "Strong";
    return "Medium";
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setStrength(checkStrength(val));
  };

  const validateEmail = (value) => {
    return /\S+@\S+\.\S+/.test(value);
  };

  const clearForm = () => {
    setPassword("");
    setRememberMe(false);
    setStrength("");
  };

  const handleLogin = () => {
    clearForm();

    if (isLocked) {
      alert("Account is locked. Please try again later.");
      return;
    }

    if (!username || !password) {
      alert("Fields cannot be empty");
      return;
    }

    if (!validateEmail(username)) {
      alert("Invalid email format");
      return;
    }

    // Mock auth
    if(password!=="Password123") {
      alert("Incorrect password. Please try again.");
    }
    if (password === "Password123") {
      alert("Login successful");
      setIsLoggedIn(true);

      if (rememberMe) {
        localStorage.setItem("user", username);
      } else {
        localStorage.removeItem("user");
      }

      setAttempts(0);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLocked(true);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    alert("Logged out successfully");
    setIsLoggedIn(false);
  };

  const renderLoginForm = () => {
    return (
      <div>
        <h2>Secure Login</h2>

        <input
          id="email-input"
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          id="password-input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>

        <p>Password Strength: {strength}</p>
      </div>
    );
  };

  const renderRememberMe = () => {
    return (
      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        Remember Me
      </label>
    );
  };

  const Button = ({text, onClick, disabled}) =>{
    return (
        <button onClick={onClick} disabled={disabled}>{text}</button>
    )
  }

  const diplayWelcomeMessage = () => {
    if (isLoggedIn) {
      return <h2>Welcome, {username.trim().split('@')[0]}</h2>;
    }
    return null;
  };

  const renderLockoutMessage = () => {
    if (isLocked) {
      return <p style={{ color: "red" }}>Account locked. Try again in {timer} seconds.</p>;
    }
    return null;
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        {!isLoggedIn && (
          <>
            {renderLoginForm()}
            {renderRememberMe()}
            <div><Button text="Login" onClick={handleLogin} disabled={isLocked} /></div>
          </>
        )}
      </div>
      <div>
        {diplayWelcomeMessage()}
        {isLoggedIn && <div><Button text="Logout" onClick={logout} /></div>}
      </div>
      {renderLockoutMessage()}
    </div>
  );
}

export default LoginWithAuth;