import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password); // Logic calls backend and saves to Mongo
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/background_banner.jpg')" }}>
      
      <div className="max-w-[450px] w-full bg-black/80 rounded-lg px-12 py-16 shadow-2xl">
        <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full h-12 bg-zinc-800 text-white px-5 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full h-12 bg-zinc-800 text-white px-5 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button disabled={isLoading} className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition active:scale-95">
            {isLoading ? "Checking..." : "Sign In"}
          </button>
        </form>
        <p className="mt-8 text-zinc-500 text-sm">
          New to Netflix? <span onClick={() => navigate("/signup")} className="text-white hover:underline cursor-pointer font-bold">Sign Up now.</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;