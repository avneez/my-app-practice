import React, {useState} from 'react';
import LeftSide from './LeftSide';
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';
import appConstant from '../constant/constant.json';

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const [resultMessage, setResultMessage] = useState('');
  const [inputValues, setInputValue] = useState({
    detail : "",
  });

  const [validation, setValidation] = useState({
    detail : "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputValue({...inputValues, [name]: value});
  }
  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));

    //validation

    if (!inputValues.detail.trim()) {
      errors.detail = "Email or Mobile Number is required";
    } else {
      errors.detail = "";
    }

    setValidation(errors);
    if (errors.detail === ''){
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
      const forgotData = {
          email_or_phone: inputValues.detail
      }
      const params = {
        headers: {
          "Content-Type": 'application/json',
          "Access-Control-Allow-Origin": '*'
        }
      };
      axios.post(`${appConstant.API_URL}/forgot_password/otp`, forgotData, params)
          .then(res => {
            setIsLoading(false);
            if (res.data.status === 200) {
              localStorage.setItem('forget_token', res?.data?.meta.token);
              nav('/password-otp', {state:{email_or_phone:res?.data?.email_or_phone}});
            }else {
              setResultMessage(res.data.error);
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
            <h1 className="heading">Forgot your password?</h1>
            <p className="description">Please enter your registered email address or mobile number to retrieve password.</p>
            <form className="form-box" onSubmit={handleSubmit}>
              <div className="input-box">
                {resultMessage && <p className='formErrors'>{resultMessage}</p>}
                <input className="input-style px-4" type="text" id="detail" name="detail" placeholder="Enter Email or Mobile Number" autoComplete="off" value={inputValues.detail} onChange={(e) => handleChange(e)} />
                {validation.detail && <p className='formErrors mt-2'>{validation.detail}</p>}
              </div>
              {isLoading ? <div className='position-relative'><button className="submit-btn" disabled={true} type="button">Send</button> <img className='position-absolute' style={{"top" : "30%", "right" : "30%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button className="submit-btn">Send</button>
                }
            </form>
            <p className="small">Back to <Link to="/" className="login-links">Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
