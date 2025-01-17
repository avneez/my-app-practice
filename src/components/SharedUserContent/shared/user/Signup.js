import React, {useState} from 'react';
import LeftSide from './LeftSide';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import appConstant from "../constant/constant.json";
import "../../admin/css/registration.css"

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const nav = useNavigate();

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


  const [inputValues, setInputValue] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    checkedError : "",
  });
  const [checked, setChecked] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));

    //username validation
    if (!inputValues.username.trim()) {
      errors.username = "Full Name is required";
    } else {
      errors.username = "";
    }

    //number validation
    const numberCond = /^(?:\+966|0)?\d{9}$/;
    if (!inputValues.number.trim()) {
      errors.number = "Number is required";
    }
     else if (!inputValues.number.match(numberCond)) {
      errors.number = "Please enter 9 digit or 0 followed by 9 digit or +966 followed by 9 digit";
    }  else if(inputValues.number.length===9 && inputValues.number.charAt(0)==='0'){
     
      errors.number = "Please enter valid number";
    }
    else {
      errors.number = "";
    }

    // email validation
    const emailCond = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9-]{2,})*$/;
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond)) {
   
      errors.email =`Please enter valid Email address`;

        } else {
      errors.email = "";
    }

    //password validation
    const password = inputValues.password;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#\$%\^&\*])(?=.{6})/;
    if (!password) {
      errors.password = 'Password is required';
    } else if (!password.match(passReg)) {
      errors.password = "Password must be at least 6 characters and must include at least one upper case letter, one lower case letter, one special character (!@#$%^&*.) and one numeric digit.";
    } else {
      errors.password = ''
    }

    // terms checked errors
    if (!checked) {
      errors.checkedError = 'Please accept terms of services';
    } else {
      errors.checkedError = '';
    }
    setValidation(errors);
    if (errors.username === '' && errors.email === '' && errors.number === '' && errors.password === '' && errors.checkedError === ''){
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuccess = checkValidation();
    if (isSuccess){
      setIsLoading(true);
      const signupData = {
        type: 'sms_account',
        full_name: inputValues.username,
        phone_number: inputValues.number,
        email: inputValues.email,
        password: inputValues.password,
      };
      const params = {
        headers: {
          "Content-Type": 'application/json',
          "Access-Control-Allow-Origin": '*'
        }
      };
      axios.post(`${appConstant.API_URL}/account/accounts`, signupData, params)
          .then(res => {
            setIsLoading(false);
            if (res.data.status === 200) {
              nav('/varify', {state:{phoneNumber:res.data.data.phone_number}});
            }else {
              setResultMessage(res.data.message);
            }
          })
          .catch(error => { 
            setIsLoading(false);
          });
    }

  };

    return (
      <div className="row w-100 p-0 m-0 layout">
        <LeftSide/>
        <div className="col-md-6 p-0 m-0">
          <div className="form-container">
            <div className="form-content px-3">
            <img src="/images/Alyya.png" className="icons" alt="alyya-logo" />
              <h1 className="heading" data-testid="signup_caption">A Premier one stop rental solutions for all your construction equipment needs.</h1>
              {/* <p className="description" ></p> */}
              <p className="description" testID="login_desc">Signup to List your construction equipment or Hire required Equipments and get competitive quotes.</p>
              <form className="form-box" testID='submit_Form' onSubmit={handleSubmit}>
                {resultMessage && <p className='formErrors'>{resultMessage}</p>}
                {/* <div className="input-box-new">
                <div className="did-floating-label-content">
                  <input className="input-style did-floating-input style-input" type="text" id="email" name="email" placeholder=' ' autoComplete="off" value={inputValues.email} onChange={(e) => handleChange(e)} />
                  <label className="did-floating-label">Email</label>
                  <div className='iconmail' htmlFor="email"><img src="/images/email-icon.png" className="icons" alt="email"/></div>
                  {validation.email && <p className='formErrors'>{validation.email}</p>}
                </div>
                </div> */}
                <div className="input-box-new">
                  <div className="did-floating-label-content">
                  <input className="input-style did-floating-input style-input" type="text" value={inputValues.username} onChange={(e) => handleChange(e)} id="username" name="username" placeholder=" "/>
                  <label className="did-floating-label">Full Name</label>
                  <div className='iconmail' htmlFor="username"><img src="/images/user-icon.png" className="icons" alt="name"/></div>
                  {validation.username && <p className='formErrors'>{validation.username}</p>}
                </div>
                </div>
                <div className="input-box-new">
                <div className="did-floating-label-content">
                  <input className="input-style did-floating-input style-input" type="text" testID='signup_number' value={inputValues.number} onChange={(e) => handleChange(e)} id="number" name="number" placeholder=" "/>
                  <label className="did-floating-label">Phone number</label>
                  <div  className='iconmail' htmlFor="number"><img src="/images/mobile-icon.png" className="icons" alt="number"/></div>
                  {validation.number && <p className='formErrors' testID='signup_number_err'>{validation.number}</p>}
                </div>
                </div>
                <div className="input-box-new">
                <div className="did-floating-label-content">
                  <input className="input-style did-floating-input style-input" data-testid="signup_email" type="text" value={inputValues.email} onChange={(e) => handleChange(e)} id="email" name="email" placeholder=" " autoComplete="off"/>
                  <label className="did-floating-label"> Email ID</label>
                  <div className='iconmail' htmlFor="email"><img src="/images/email-icon.png" className="icons" alt="email"/></div>
                  {validation.email && <p className='formErrors' data-testid="signup_email_err" >{validation.email}</p>}
                </div>
                </div>
                <div className="input-box-new">
                <div className="did-floating-label-content">
                  <input className="input-style did-floating-input style-input" type={passwordShown ? "text" : "password"} value={inputValues.password} onChange={(e) => handleChange(e)} id="password" name="password" placeholder=" "  data-testid="signup-password" autoComplete="off"/>
                  <label className="did-floating-label">Set Password</label>
                  <div className='iconmail' htmlFor="password"><img src="/images/password-icon.png" className="icons" alt="password"/></div>
                  <img src={passwordShown ? "/images/eyeshow.png" : "/images/eyehide.png"} className="password-hide" alt="password" onClick={togglePassword}/>
                  {validation.password && <p className='formErrors' data-testid="signup_password_err">{validation.password}</p>}
                </div>
                </div>
                <label className="checkbox-style"><span className="small">I agree to <Link to="/terms-conditions" target={'_BLANK'} className="login-links">terms of service</Link></span>
                  <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}/>
                  <span className="checkmark"></span>
                  {validation.checkedError && <p className='formErrors'>{validation.checkedError}</p>}
                </label>
                {isLoading ? <div className='position-relative'><button className="submit-btn" disabled={true} type="button">Sign Up</button> <img className='position-absolute' style={{"top" : "30%", "right" : "30%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button className="submit-btn" data-testid="submit-button">Sign Up</button>
                }
              </form>
              <p className="small">Already have an account? <Link to="/" className="login-links">Click here to Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>

    );
  }

  export default Signup;
