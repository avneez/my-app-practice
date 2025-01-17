import React, {useState} from 'react';
import LeftSide from './LeftSide';
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import appConstant from '../constant/constant.json';

function PasswordOtp() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const [otpToken, setOtpToken] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const location = useLocation();

  const [inputValues, setInputValue] = useState({
    otp: ''
  });
  const [validation, setValidation] = useState({
    otp: ''
  });
  console.log('mylocation', location);
    if(location?.state === null){
        nav('/');
    }
  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));
    //otp validation
      console.log('I am here');
    if (!inputValues.otp.trim()) {
      errors.otp = 'OTP is required';
    } else {
      errors.otp = '';
    }
    setValidation(errors);
    if (errors.otp === '') {
        confirmOTP();
    } else {
        return false;
    }
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkValidation();
  };

  const sendOTP = () => {
      const forgotData = {
          email_or_phone: String(location.state.email_or_phone)
      }
      const params = {
          headers: {
              "Content-Type": 'application/json',
              "Access-Control-Allow-Origin": '*'
          }
      };
      axios.post(`${appConstant.API_URL}/forgot_password/otp`, forgotData, params)
          .then(res => {
              if (res.data.status === 200) {
                  localStorage.setItem('forget_token', res.data.meta.token);
                  setResultMessage('OTP Sent');
              }else {
                  setResultMessage(res.data.error);
              }
          })
          .catch(error => {

          });
}


  const confirmOTP = () => {
    setIsLoading(true);
    const params = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "token": otpToken

        }
    };
    const forgotParams = {
      "data": {
          "token": localStorage.getItem('forget_token'),
          "otp_code": inputValues.otp
      }
  };
    axios.post(`${appConstant.API_URL}/forgot_password/otp_confirmation`, forgotParams, params)
        .then(res => {
          setIsLoading(false);
            if (res.data.status === 200) {
                // localStorage.setItem("token", res.data.tokens);
                localStorage.setItem("otp_code", res.data.otp_code);
                nav('/reset-password');
            }else {
                setResultMessage(res.data.error);
            }
        })
        .catch(error => {
          setIsLoading(false);
        });
}

    return (
      <div className="row w-100 p-0 m-0 layout">
        <LeftSide/>
        <div className="col-md-6 p-0 m-0">
          <div className="form-container">
            <div className="form-content px-3">
              <h1 className="heading">Enter OTP</h1>
              <p className="description">We have sent you a one time password to your phone number</p>
              <form className="form-box" onSubmit={handleSubmit}>
                  {resultMessage && <p className='formErrors'>{resultMessage}</p>}
                <div className="input-box">
                  <input className="input-style" type="text" id="otp" name="otp" placeholder="One Time Password" value={inputValues.otp} onChange={(e) => handleChange(e)}/>
                    {validation.otp && <p className='formErrors' style={{textAlign: "center"}}>{validation.otp}</p>}
                  <label htmlFor="number"><img src="/images/mobile-icon.png" className="icons" alt="number"/></label>
                </div>
                <p className="small mb-0">Didn't recieve? <span className="login-links" onClick={() => {sendOTP()}}>Resend</span></p>
                {isLoading ? <div className='position-relative'><button className="submit-btn" disabled={true} type="button">Submit</button> <img className='position-absolute' style={{"top" : "30%", "right" : "30%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button className="submit-btn">Submit</button>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default PasswordOtp;
