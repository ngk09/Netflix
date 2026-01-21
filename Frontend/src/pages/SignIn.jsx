import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Changed from username to email
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Firebase auth uses email and password
      await login(email, password); 
      navigate("/");
    } catch (err) {
      // Errors are now handled by the Firebase SDK and store
      console.error("Login failed:", err);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/netflix_bg.png')" 
      }}
    >
      <div className="max-w-[450px] w-full bg-black/80 rounded-lg px-12 py-16 shadow-2xl border border-white/10">
        <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full h-12 bg-zinc-800 text-white px-5 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full h-12 bg-zinc-800 text-white px-5 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
          <button 
            disabled={isLoading} 
            className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition active:scale-95 disabled:bg-red-800"
          >
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