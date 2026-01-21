import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Components & Pages
import Homepage from './pages/Homepage'; 
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Card from "./components/Card.jsx";
const App = () => {
  const { user, checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    // This initializes the Firebase listener
    const unsubscribe = checkAuth();
    // Cleanup listener on unmount
    return () => { if (unsubscribe) unsubscribe(); };
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-red-600 font-bold text-3xl">
        NETFLIX
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {user && <Navbar />} 
      
      <main className="flex-grow">
        <Routes>
          <Route 
            path="/" 
            element={
              user ? (
                <>
                  <Homepage />
                  <Card /> {/* 2. Card placed right below Homepage hero */}
                </>
              ) : (
                <Navigate to="/signin" />
              )
            } 
          />
          <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        </Routes>
      </main>

      {user && <Footer />}
    </div>
  );
};

export default App;