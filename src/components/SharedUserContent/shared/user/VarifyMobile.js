import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import appConstant from '../constant/constant.json';

function VarifyMobile() {
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        sendOTP();
    }, []);
    const nav = useNavigate();
    const location = useLocation();
    console.log(location);
    const [inputValues, setInputValue] = useState({
        otp: ''
    });
    const [validation, setValidation] = useState({
        otp: ''
      });
    const [resultMessage, setResultMessage] = useState('');
    const [otpToken, setOtpToken] = useState('');
    if(location.state === null){
        nav('/');
    }
      function handleChange(e) {
        const { name, value } = e.target;
        setInputValue({ ...inputValues, [name]: value });
      }

      const checkValidation = () => {
        let errors = JSON.parse(JSON.stringify(validation));
        //otp validation
        if (!inputValues.otp.trim()) {
          errors.otp = "OTP is required";
        } else {
          errors.otp = "";
        }
        setValidation(errors);
        if(errors.otp === ''){
            confirmOTP();
        }else{
            return false;
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        checkValidation();
      };

    const sendOTP = () => {
        const sendOtpData = {
            "data": {
                "attributes": {
                    "phone_number": location.state?.phoneNumber
                }
            }
        }
        const params = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }
        axios.post(`${appConstant.API_URL}/account_block/accounts/send_otps`, sendOtpData, params)
            .then(res => {
                if (res.data.status === 200) {
                    setOtpToken(res.data.token);
                    setResultMessage('OTP Sent.')
                }else if (res.data.status === 401) {
                    setResultMessage(res.data.message);
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
        axios.post(`${appConstant.API_URL}/account_block/accounts/sms_confirmations?pin=${inputValues.otp}`, {}, params)
            .then(res => {
                setIsLoading(false);
                if (res.data.status === 200) {
                    localStorage.setItem("token", res.data.tokens.login_token);
                    localStorage.setItem("full_name", res.data.data.full_name);
                    localStorage.setItem("user_type", res.data.data.user_type);
                    localStorage.setItem("cartTotal", 0);
                    localStorage.setItem("image", '/images/login_banner.png');
                    localStorage.setItem('notificationCount', 0);
                    if(res?.data?.data?.user_type === 'seller' && res?.data?.registration === true){
                        nav('/dashboard');
                    }else if(res?.data?.data?.user_type === 'seller' && res?.data?.registration === false){
                        nav('/register-organization');
                    }else{
                        nav('/home/hire-equipment');
                    }
                }else {
                    setResultMessage(res.data.message);
                }
            })
            .catch(error => {
                setIsLoading(false);
            });
    }

    return (
        <div className="d-flex varify-mobile flex-column px-3 text-center">
            <img src="/images/varify-mobile.png" className="varify-img" alt="name"/>
            <div className="title">Vereify your mobile number</div>
            <div className="description">We have sent you a <strong>One Time Password</strong> to your mobile number please check your messages and enter the code below.</div>
            <form className="w-100" onSubmit={handleSubmit}>
                {resultMessage && <p className='formErrors'>{resultMessage}</p>}
                <input className="input-style" type="text" id="otp" name="otp" placeholder="Enter OTP" value={inputValues.otp} onChange={(e) => handleChange(e)}/>
                {validation.otp && <p className='formErrors' style={{textAlign: "center"}}>{validation.otp}</p>}
                {isLoading ? <div className='position-relative'><button className="submit-btn" disabled={true} type="button">Verify</button> <img className='position-absolute' style={{"top" : "30%", "right" : "30%"}} src='/images/default.gif' width={'16px'} height={'16px'}/></div> :
                    <button className="submit-btn">Verify</button>
                }
            </form>
            <p className="small">Didn't receive code <span onClick={() => {sendOTP()}} className="login-links resend">Click here to resend OTP</span></p>
        </div>
    );
}

export default VarifyMobile;
