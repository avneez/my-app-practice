import React, {useState} from 'react';
import LeftSide from './LeftSide';
import { Link } from "react-router-dom";

function LoginOtp() {
  const [inputValues, setInputValue] = useState({
    number: "",
    otp: "",
  });
  const [validation, setValidation] = useState({
    number: "",
    otp: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));
    //number validation
    const numberCond = /^(?:\+966|0)?\d{9}$/;
    if (!inputValues.number.trim()) {
      errors.number = "Number is required";
    } else if (!inputValues.number.match(numberCond)) {
      errors.number = "Please enter valid number";
    } else if (inputValues.number.length < 10 || inputValues.number.length > 10) {
      errors.number = "Please enter 10 digit valid number";
    } else {
      errors.number = "";
    }

    //otp validation
    if (!inputValues.otp.trim()) {
      errors.otp = "OTP is required";
    } else {
      errors.otp = "";
    }
    setValidation(errors);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    checkValidation();
  };

    return (
      <div className="row w-100 p-0 m-0 layout">
        <LeftSide/>
        <div className="col-md-6 p-0 m-0">
          <div className="form-container">
            <div className="form-content px-3">
              <h1 className="heading">Enter OTP</h1>
              <p className="description">We have sent you a One Time password to your phoone number</p>
              <form className="form-box" onSubmit={handleSubmit}>
                <div className="input-box">
                  <input className="input-style" type="text" id="number" name="number" placeholder="Enter Number" value={inputValues.number} onChange={(e) => handleChange(e)}/>
                  <label htmlFor="number"><img src="/images/mobile-icon.png" className="icons" alt="number"/></label>
                  {validation.number && <p className='formErrors'>{validation.number}</p>}
                </div>
                <div className="input-box">                  
                  <input className="input-style" type="text" id="otp" name="otp" placeholder="One Time Password" value={inputValues.otp} onChange={(e) => handleChange(e)}/>
                  <label htmlFor="otp"><img src="/images/password-icon.png" className="icons" alt="otp" /></label>
                  {validation.otp && <p className='formErrors'>{validation.otp}</p>}
                </div>
                <p className="small mb-0">Didn't recieve? <a href="/" className="login-links">Resend</a></p>
                <button className="submit-btn" disabled>Login</button>
              </form>
              <p className="small">Don't have an account? <Link to="/signup" className="login-links">Click here to Signup</Link></p>
              <div className="another-login">
                <span>OR</span>
              </div>
              <Link to="/" className="login-links">Login Using Email address</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default LoginOtp;