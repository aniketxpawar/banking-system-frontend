import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components for login and home
import Login from './components/Login';
import Home from './components/Home';

const isAuthenticated = () => {
  const accessToken = localStorage.getItem('token');
  return !!accessToken; // Returns true if there is an access token, false otherwise
};

// PrivateRoute component to handle protected routes
const PrivateRoute = ({ component: Component }) => {
  if (isAuthenticated()) {
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
      <Route path="/" element={<PrivateRoute component={Home} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
