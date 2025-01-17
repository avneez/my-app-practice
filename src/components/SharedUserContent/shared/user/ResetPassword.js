import React, {useState} from 'react';
import LeftSide from './LeftSide';
import axios from 'axios';
import appConstant from '../constant/constant.json';
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const nav = useNavigate();
  const toggleNewPassword = (e) => {
    setNewPasswordShown(!newPasswordShown);
  };
  const toggleConfirmPassword = (e) => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const [inputValues, setInputValue] = useState({
      newPassword : "",
      confirmPassword : ""
  });

  const [validation, setValidation] = useState({
      newPassword : "",
      confirmPassword : ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputValue({...inputValues, [name]: value});
  }
  const checkValidation = () => {
    let errors = JSON.parse(JSON.stringify(validation));
    //new password validation
    const password = inputValues.newPassword;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6})/;
    if (!password) {
      errors.newPassword = 'Password is required';
    } else if (!password.match(passReg)) {
      errors.newPassword = "Password must be at least 6 characters and must include at least one upper case letter, one lower case letter, one special character (!@#$%^&*.) and one numeric digit.";
    } else {
      errors.newPassword = '';
    }

    //new password validation
    const cpassword = inputValues.confirmPassword;
    if (!cpassword) {
      errors.confirmPassword = 'Repeat New Password';
    } else if (cpassword !== password) {
      errors.confirmPassword = 'Both password should match';
    } else {
      errors.confirmPassword = '';
    }
    setValidation(errors);
    if (errors.newPassword === '' && errors.confirmPassword === '') {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isSuccess = checkValidation();
    if (isSuccess) {
      resetPassword();
   } else{
      console.log('manish');
    }
  };

  const resetPassword = () => {
    setIsLoading(true);
    const params = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"

      }
    };
    const resetPasswordParams = {
      data: {
        token: localStorage.getItem('forget_token'),
        new_password: inputValues.newPassword,
        new_password_confirmation: inputValues.confirmPassword
      }
    }
    axios.post(`${appConstant.API_URL}/forgot_password/password`, resetPasswordParams, params)
        .then(res => {
          setIsLoading(false);
          if (res.data.status === 200) {
            nav('/');
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
            <h1 className="heading">Change password</h1>
            <p className="description">Please enter your new password. Minimum length is 8 characters, password and confirmation must match.
</p>
            <form className="form-box" onSubmit={handleSubmit}>
              {resultMessage && <p className='formErrors'>{resultMessage}</p>}
              <div className="input-box">
                <input className="input-style" type={newPasswordShown ? "text" : "password"} id="newPassword" name="newPassword" data-testid="reset-password" placeholder="New Password" autoComplete="off" value={inputValues.newPassword} onChange={(e) => handleChange(e)} />
                <label htmlFor="newPassword"><img src="/images/password-icon.png" className="icons" alt="password"/></label>
                <img src={newPasswordShown ? "/images/eyeshow.png" : "/images/eyehide.png"} className="password-hide" alt="password" onClick={toggleNewPassword}/>
                {validation.newPassword && <p className='formErrors' data-testid="resetErrorMessage">{validation.newPassword}</p>}
              </div>
              <div className="input-box">
                <input className="input-style" type={confirmPasswordShown ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Password Confirmation" autoComplete="off" value={inputValues.confirmPassword} onChange={(e) => handleChange(e)} />
                <label htmlFor="confirmPassword"><img src="/images/password-icon.png" className="icons" alt="password" /></label>
                <img src={confirmPasswordShown ? "/images/eyeshow.png" : "/images/eyehide.png"} className="password-hide" alt="password" onClick={toggleConfirmPassword}/>
                {validation.confirmPassword && <p className='formErrors' >{validation.confirmPassword}</p>}
              </div>
              {isLoading ? <div className='position-relative'><button className="submit-btn" disabled={true} type="button" data-testid="submit-btn">Change Password</button> <img className='position-absolute' style={{"top" : "30%", "right" : "20%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button className="submit-btn">Change Password</button>
                }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
