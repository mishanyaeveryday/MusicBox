import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import '../design/Auth.css';

const Verify = () => {
  const [fullCode, setCode] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const inputRefs = useRef([]);
  const email = localStorage.getItem('email');

  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newCode = [...fullCode];
    newCode[index] = value;

    setCode(newCode);
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      const newCode = [...fullCode];

      if (fullCode[index]) {
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('Text').slice(0, 6);
    const newCode = [...fullCode];

    setTimeout(() => {
      pastedData.split('').forEach((char, index) => {
        if (index < 6) {
          newCode[index] = char;
        }
      });

      setCode(newCode);

      const nextEmptyIndex = pastedData.length < 6 ? pastedData.length : 5;
      inputRefs.current[nextEmptyIndex].focus();
    }, 0);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    const otp = fullCode.join('');
    const email = localStorage.getItem('email');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}core/users/verify_otp/`,
        { otp, email }
      );

      console.log('Server response:', response);

      if (response.data.access && response.data.refresh && response.data.user) {
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('userId', response.data.user.id);

        const userId = localStorage.getItem('userId');
        console.log('Fetched userId:', userId);

        if (userId) {
          navigate('/user/');
        } else {
          console.error('User ID is missing from localStorage.');
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMessage(error.response?.data?.detail || 'Error occurred during verification.');
    }
  };


  return (
    <div className="centered" style={{ textAlign: "center" }}>
      <Card color="transparent" shadow={false}>
        <div className="flex items-center ml-10 mt-5">
          <Link className='text-indigo-900' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
            Home&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
          </Link>
          <Link className='underline text-indigo-900' size='sm' style={{ fontFamily: 'Arsenal' }}>
            Verify
          </Link>
        </div>
        <Typography variant="h2" style={{ fontFamily: 'Philosopher' }} className="text-indigo-900 p-10 font-thin">
          Personal data
        </Typography>
        <center>
          <Typography variant="div" style={{ fontFamily: 'Philosopher' }} className="text-black font-thin w-1/3">
            We have sent you a mail to {email} for confirmation. Please enter the verification code below.
          </Typography>
          <form className="mt-8 mb-2 w-1/3" onSubmit={handleVerifyCode}>
            <div className='container'>
              {fullCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className='input'
                  maxLength={1}
                />
              ))}
            </div>
            <Button color='indigo' className="mt-12 text-2xl rounded-2xl font-thin mb-20" fullWidth type="submit" style={{ fontFamily: 'Philosopher' }} variant="solid">
              Confirm
            </Button>
          </form>
          {message && <p className="text-red-500">{message}</p>}
        </center>
      </Card>
    </div>
  );
};

export default Verify;
