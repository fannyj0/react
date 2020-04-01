import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <>
    {toggle ? 
    <LoginForm/> : 
    <RegisterForm/>
    }
    
    </>
  );
};

export default Login;