import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Card from './pages/Card';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
  const { user } = useAuthStore(); 

  return (
    <div className="bg-black min-h-screen">
      <Routes>
        <Route path="/" element={
          user ? (
            <>
              <Navbar />
              <Homepage />
              <Card />
              <Footer />
            </>
          ) : (
            <Navigate to="/signin" />
          )
        } />
        <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/signin"} />} />
      </Routes>
    </div>
  );
};

export default App;