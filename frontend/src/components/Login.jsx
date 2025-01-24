import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../design/Auth.css';

const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}core/users/login/`, {
        username: login,
        password
      });
      localStorage.setItem('email', response.data.user.email);
      navigate('/verify');
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Ошибка входа');
    }
  };


  return (
    <div className="enterD centered" style={{ textAlign: "center" }}>
      <Card color="transparent" shadow={false} style={{ height: "100%", justifyContent: "center" }}>
        <div className="flex items-center ml-10 mt-5">
          <Link className='text-indigo-900' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
            Home&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
          </Link>
          <Link className='underline text-indigo-900' size='sm' style={{ fontFamily: 'Arsenal' }}>
            Login
          </Link>
        </div>
        <Typography variant="h2" style={{ fontFamily: 'Philosopher' }} className="text-indigo-900 pt-10 font-thin">
          LOGIN
        </Typography>
          <center>
            <form className="px-24 mt-8 mb-2 max-w-screen-lg" onSubmit={handleLogin}>
              <div className="mb-1 flex flex-col gap-6">
                <div className="mb-1 flex flex-col gap-6">
                  <Input type="text" size="lg"
                    placeholder="Login"
                    className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="login" value={login} onChange={(e) => setLogin(e.target.value)} />
                  <Input type="password" size="lg"
                    placeholder="***********"
                    className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <Button color="indigo" className="mt-12 text-white text-2xl rounded-2xl font-thin" fullWidth style={{ fontFamily: 'Philosopher' }} type="submit" variant="solid">
                Continue
              </Button>
            </form>
            {message && <p style={{ color: message.includes("accepted") ? "green" : "red" }}>{message}</p>}
          </center>
          <div className="flex flex-col items-center mb-20">
            <Link to="/register" className='p-2 underline text-white' style={{ fontFamily: 'Arsenal' }}>
              <Button color="indigo" className="mx-5" variant="text">
                Register
              </Button>
            </Link>
          </div>
      </Card>
    </div>
  );
};

export default LoginForm;