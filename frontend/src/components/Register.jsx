import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../design/Auth.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}core/users/create/`, formData);
      if (response.data.success) {
        setMessage("Регистрация успешна!");
        navigate("/login");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Ошибка регистрации пользователя");
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
            Register
          </Link>
        </div>
        <Typography variant="h2" style={{ fontFamily: 'Philosopher' }} className="text-indigo-900 pt-10 font-thin">
          REGISTRATION
        </Typography>
        <center>
          <form className="px-24 mt-8 mb-2 max-w-screen-lg" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <div className="mb-1 flex flex-col gap-6">
                <Input type="text" size="lg"
                  placeholder="login"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="login" value={formData.login} onChange={handleChange} />
                <Input type="email" size="lg"
                  placeholder="example@email.com"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="email" value={formData.email} onChange={handleChange} />
                <Input type="password" size="lg"
                  placeholder="***********"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="password" value={formData.password} onChange={handleChange} />
                <Input type="password" size="lg"
                  placeholder="***********"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              </div>
            </div>
            <Button color="indigo" className="mt-12 text-white text-2xl rounded-2xl font-thin" fullWidth style={{ fontFamily: 'Philosopher' }} type="submit" variant="solid">
              Continue
            </Button>
          </form>
          {message && <p style={{ color: message.includes("plus") ? "green" : "red" }}>{message}</p>}
        </center>
        <div className="flex flex-col items-center mb-20">
          <Link to="/login" className='p-2 underline text-white' style={{ fontFamily: 'Arsenal' }}>
            <Button color="indigo" className="mx-5" variant="text">
              Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;