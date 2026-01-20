import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Sends plain-text data to MongoDB via Backend
      await signup(username, email, password); 
      navigate("/signin");
    } catch (err) {
      console.error("Signup failed:", err);
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
        <h1 className="text-white text-3xl font-bold mb-8">Sign Up</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full h-12 bg-zinc-800 text-white px-5 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full h-12 bg-zinc-800 text-white px-5 rounded focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Create Password" 
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
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-8 text-zinc-500 text-sm">
          Already have an account? <span onClick={() => navigate("/signin")} className="text-white hover:underline cursor-pointer font-bold">Sign In now.</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;