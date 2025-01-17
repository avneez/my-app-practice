import React, {useEffect, useState} from 'react';
import LeftSide from './LeftSide';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import appConstant from '../constant/constant.json';

function LoginMobile() {
  const [isSentOtpLoading, setIsSentOtpLoading] = useState(false);
  const [isLoginLoading, setLoginIsLoading] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem("user_type") === 'seller') {
        nav('/dashboard');
      } else {
        nav('/home/hire-equipment');
      }
    }
  }, []);
  const [inputValues, setInputValue] = useState({
    number: '',
    otp: ''
  });
  const [validation, setValidation] = useState({
    number: '',
    otp: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
  }
  const [resultMessage, setResultMessage] = useState('');
  const [isHide, setIsHide] = useState(true);
  const [otpToken, setOtpToken] = useState('');
  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));
    //number validation
    const numberCond = /^(?:\+966|0)?\d{9}$/;
    if (!inputValues.number) {
      errors.number = 'Number is required';
    } else if (!inputValues.number.match(numberCond)) {
      errors.number = 'Please enter valid number';
    }else if(inputValues.number.length===9 && inputValues.number.charAt(0)==='0'){
     
      errors.number = "Please enter valid number";
    } 
    else {
      errors.number = '';
    }
    if (!isHide) {
      if (!inputValues.otp) {
        errors.otp = 'OTP is required.';
      }else {
        errors.otp = '';
      }
      setValidation(errors);
      if (errors.otp === '') {
        return true;
      } else {
        return false;
      }

    }

    setValidation(errors);
    if (errors.number === '') {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    //e.preventDefault();
    const isSuccess = checkValidation();
    if (isSuccess) {
      if (!isHide) {
        confirmOTP();
      } else {
        sendOTP();
        setResultMessage('OTP sent');
      }
    }
  };
  const confirmOTP = () => {
    setLoginIsLoading(true);
    const params = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "token": otpToken

      }
    };
    axios.post(`${appConstant.API_URL}/account_block/accounts/sms_confirmations?pin=${inputValues.otp}`, {}, params)
        .then(res => {
          setLoginIsLoading(false);
          if (res.data.status === 200) {
            localStorage.setItem("token", res.data.tokens.login_token);
            localStorage.setItem("full_name", res.data.data.full_name);
            localStorage.setItem("user_type", res.data.data.user_type);
            localStorage.setItem("cartTotal", 0);
            localStorage.setItem('notificationCount', 0);
            if(res?.data?.image){
              localStorage.setItem("image", res?.data?.image);
            }else{
              localStorage.setItem("image", '/images/login_banner.png');
            }
            if(res?.data?.data?.user_type === 'seller' && res?.data?.registration === true){
              nav('/dashboard');
            }else if(res?.data?.data?.user_type === 'seller' && res?.data?.registration === false){
              nav('/register-organization');
            }else{
              nav('/home/hire-equipment');
            }
          }else{
            setResultMessage(res.data.message);
          }
        })
        .catch(error => {
          setLoginIsLoading(false);
        });
  }
  const sendOTP = () => {
    setIsSentOtpLoading(true);
    const sendOtpData = {
      data: {
        attributes: {
          phone_number: inputValues.number
        }
      }
    };
    const params = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios.post(`${appConstant.API_URL}/account_block/accounts/send_otps`, sendOtpData, params)
        .then(res => {
          setIsSentOtpLoading(false);
          if (res.data.status === 200) {
            setOtpToken(res.data.token);
            setIsHide(false);
          }else if (res.data.status === 401) {
            setResultMessage(res.data.message);
          }
        })
        .catch(error => {
          setIsSentOtpLoading(false);
        });
  };

    return (
      <div className="row w-100 p-0 m-0 layout">
        <LeftSide/>
        <div className="col-md-6 p-0 m-0">
          <div className="form-container">
            <div className="form-content px-3">
              <h1 className="heading">Login Alyya</h1>
              <p className="description">Login in the account to hire equipment, hireout your own equipment and get the quotes for required equipment.</p>
              <form className="form-box">
                {resultMessage && <p className='formErrors'>{resultMessage}</p>}
                <div className="input-box">
                  <input className="input-style" type="text" id="number" name="number" placeholder="Enter Number" value={inputValues.number} onChange={(e) => handleChange(e)} data-testid="phone_number_field"/>
                  <label htmlFor="number"><img src="/images/mobile-icon.png" className="icons" alt="number"/></label>
                  {validation.number && <p className='formErrors' data-testid="number_error_field">{validation.number}</p>}
                </div>
                <div className={"input-box " + (isHide === true ? 'hideBlock' : '')}>
                  <input className="input-style" type="text" id="otp" name="otp" placeholder="One Time Password" value={inputValues.otp} onChange={(e) => handleChange(e)}/>
                  <label htmlFor="otp"><img src="/images/password-icon.png" className="icons" alt="otp" /></label>
                  {validation.otp && <p className='formErrors'>{validation.otp}</p>}
                </div>
                <p className={"small mb-0 " + (isHide === true ? 'hideBlock' : '')}>Didn't recieve? <span onClick={() => {sendOTP()}} className="login-links">Resend</span></p>

                {isLoginLoading ? <div className='position-relative'><button className={"submit-btn " + (isHide === true ? 'hideBlock' : '')} disabled={true} type="button">Login</button> <img className='position-absolute' style={{"top" : "30%", "right" : "30%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button type="button" onClick={()=>{handleSubmit()}} className={"submit-btn " + (isHide === true ? 'hideBlock' : '')} >Login</button>
                }



                {isSentOtpLoading ? <div className='position-relative'><button className={"submit-btn " + (isHide === true ? '' : 'hideBlock')} disabled={true} type="button" >Send OTP</button> <img className='position-absolute' style={{"top" : "30%", "right" : "30%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button type="button" onClick={()=>{handleSubmit()}} className={"submit-btn " + (isHide === true ? '' : 'hideBlock')} data-testid="send_otp"> Send OTP</button>
                }
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

  export default LoginMobile;
