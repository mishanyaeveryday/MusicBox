import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formData);
      if (response.data.success) {
        setMessage("Login accepted!");
        navigate("/verify");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login declined");
    }
  };

  return (
    <div className="enterD centered" style={{ textAlign: "center" }}>
      <Card color="transparent" shadow={false} style={{ height: "100%", justifyContent: "center" }}>
        <div className="flex items-center ml-10 mt-5">
          <Link className='text-teal-500' size='sm' style={{ fontFamily: 'Arsenal' }} to={'/'}>
            Home&nbsp;&nbsp;{'>'}&nbsp;&nbsp;
          </Link>
          <Link className='underline text-teal-500' size='sm' style={{ fontFamily: 'Arsenal' }}>
            Login
          </Link>
        </div>
        <Typography variant="h2" style={{ fontFamily: 'Philosopher' }} className="text-indigo-900 pt-10 font-thin">
          LOGIN
        </Typography>
        <center>
          <form className="px-24 mt-8 mb-2 max-w-screen-lg" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">
              <div className="mb-1 flex flex-col gap-6">
                <Input type="text" size="lg"
                  placeholder="Login"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="login" value={formData.login} onChange={handleChange} />
                <Input type="password" size="lg"
                  placeholder="***********"
                  className="placeholder:opacity-100 !border-t-blue-gray-200 focus:!border-t-gray-900 bg-white" name="password" value={formData.password} onChange={handleChange} />
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
            <Button color="teal" className="mx-5" variant="text">
              Register
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;