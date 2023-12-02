import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components for login and home
import Login from './components/Login';
import Home from './components/Home';
import BankerLogin from './components/BankerLogin';
import Dashboard from './components/Dashboard';
import UserDetails from './components/UserDetails';

const isAuthenticated = () => {
  const accessToken = localStorage.getItem('token');
  return !!accessToken; // Returns true if there is an access token, false otherwise
};
const type = localStorage.getItem('userType')

const UserRoute = ({ component: Component }) => {
  if (isAuthenticated()) {
    if(type === "banker"){
      return <Navigate to="/dashboard" />
    }
    return <Component />;
  } else {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/login" />;
  }
};

const BankerRoute = ({ component: Component }) => {
  if (isAuthenticated()) {
    if(type === "user"){
      return <Navigate to="/" />
    }
    return <Component />;
  } else {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRoute component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/banker-login" element={<BankerLogin />} />
        <Route path="/dashboard" element={<BankerRoute component={Dashboard} />} />
        <Route path="/user/:userId" element={<BankerRoute component={UserDetails} />} />
      </Routes>
    </Router>
  );
}

export default App;
