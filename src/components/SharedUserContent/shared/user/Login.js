import React, {useEffect, useState} from 'react';
import LeftSide from './LeftSide';
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';
import appConstant from '../constant/constant.json';
import "../../admin/css/registration.css"


function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
        nav('/home/hire-equipment');
    }
  }, []);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [inputValues, setInputValue] = useState({
      email : "",
      password : "",
  });

  const [validation, setValidation] = useState({
      email : "",
      password : ""
  });
  const [resultMessage, setResultMessage] = useState('');
  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputValue({...inputValues, [name]: value});
  }
  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));

    // email validation
    const emailCond = /^[a-zA-Z0-9.!#$%&’*+=?^_`{|}~-]+@[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9-]{2,})*$/;
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = `Please enter valid Email address`;
    } else {
      errors.email = "";
    }

    //password validation
    const password = inputValues.password;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#\$%\^&\*])(?=.{6})/;
    if (!password) {
      errors.password = "Password is required";
    }
    else if (!password.match(passReg)) {
      errors.password = "Invalid/Wrong password";
    }
    else {
      errors.password = "";
    }
    setValidation(errors);
    if(errors.email === '' && errors.password === ''){
      return true;
    }else{
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuccess = checkValidation();
    if(isSuccess) {
      loginButton();
    }
  };
  // const [values, setValues] = useState({password: '', email: ''});
  const loginButton = (e) => {
    setIsLoading(true);
      const loginData = {
        data:{
          type: 'email_account',
          attributes: {
            email: inputValues.email,
            password: inputValues.password
          }
        }
      };
      const params = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      };
      axios.post(`${appConstant.API_URL}/login/login`, loginData, params)
          .then(res => {
            setIsLoading(false);
            if (res.data.status === 200) {
              localStorage.setItem("token", res?.data?.token);
              localStorage.setItem("full_name", res?.data?.data?.full_name);
              localStorage.setItem("user_type", res?.data?.data?.user_type);
              localStorage.setItem("registration", res?.data?.registration);
              if(res?.data?.image){
                localStorage.setItem("image", res?.data?.image);
              }else{
                localStorage.setItem("image", '/images/userr.png');
              }
              localStorage.setItem('favouriteTotal', 0);
              localStorage.setItem('cartTotal', 0);
              localStorage.setItem('notificationCount', 0);
              nav('/home/hire-equipment');
            }else {
              setResultMessage(res.data.message);
            }
          })
          .catch(error => {
            setIsLoading(false);
            // props.changeLogin(true);
          });
  }

    return (
      <div className="row w-100 p-0 m-0 layout">
        <LeftSide/>
        <div className="col-md-6 p-0 m-0">
          <div className="form-container">
            <div className="form-content px-3">
            <img src="/images/Alyya.png" className="icons" alt="alyya-logo" />
              <h1 className="heading" testID="login_cap">A Premier one stop rental solutions for all your construction equipment needs.</h1>
              <p className="description" testID="login_desc">Sign in to hire Construction equipments or List your own equipments for hire, explore listed equipments and get competitive quotes.</p>
              <form className="form-box" onSubmit={handleSubmit} >
                {resultMessage && <p className='formErrors mb-2'>{resultMessage}</p>}
                <div className="input-box-new">
                <div className="did-floating-label-content">
                  <input className="input-style did-floating-input style-input" type="text" id="email" name="email" placeholder=' ' autoComplete="off" value={inputValues.email} onChange={(e) => handleChange(e)} data-testid="login-email" />
                  <label className="did-floating-label">Email</label>
                  <div className='iconmail' htmlFor="email"><img src="/images/email-icon.png" className="icons" alt="email"/></div>
                  {validation.email && <p className='formErrors' data-testid="login-email">{validation.email}</p>}
                </div>
                </div>
                <div className="input-box-new">
                  <div className="did-floating-label-content">
                    <input className="input-style did-floating-input style-input" type={passwordShown ? "text" : "password"} id="password" data-testid="input-password" name="password" placeholder=" " autoComplete="off" value={inputValues.password} onChange={(e) => handleChange(e)} />
                    <label className="did-floating-label">Password</label>
                    <div className='iconmail' htmlFor="pwd">
                      <img src="/images/password-icon.png" className="icons" alt="password" />
                    </div>
                    <img src={passwordShown ? "/images/eyeshow.png" : "/images/eyehide.png"} className="password-hide" alt="password" onClick={togglePassword}/>
                    {validation.password && <p className='formErrors' data-testid="error-msg">{validation.password}</p>}
                  </div>
                </div>

                <div><Link to="/forget-password" className="login-links">Forgot Password?</Link></div>
                {isLoading ? <div className='position-relative'><button className="submit-btn" data-testid="btn" disabled={true} type="button">Login</button> <img className='position-absolute' style={{"top" : "30%", "right" : "30%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button className="submit-btn">Logind</button>
                }
              </form>
              <p className="small">Don't have an account? <Link to="/signup" className="login-links">Click here to Signup</Link></p>
              <div className="another-login">
                <span>OR</span>
              </div>
              <Link to="/login-mobile" className="login-links">Login Using Mobile Number</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Login;
