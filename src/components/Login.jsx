import React,{useState} from 'react';
import api from '../api'
import { useNavigate } from 'react-router-dom';
import toast, {Toaster} from 'react-hot-toast'

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        //const response = await api.login({ email, password });
        const response = await api.login({ email, password });
        console.log(response)
      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('token', response.data.token);
        navigate('/')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-600">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-blue-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-blue-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
