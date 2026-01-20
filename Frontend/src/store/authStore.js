import { create } from 'zustand';
import axios from 'axios';

// Automatically switches between local and production Vercel URL
const API_URL = import.meta.env.MODE === 'development' 
  ? 'http://localhost:5000/api/auth' 
  : '/api/auth'; 

export const useAuthStore = create((set) => ({
    user: (() => {
        try {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        } catch { return null; }
    })(),
    isLoading: false,
    error: null,

    login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/login`, { username, password });
            if (res.data.success) {
                localStorage.setItem('user', JSON.stringify(res.data.user));
                set({ user: res.data.user, isLoading: false });
                return res.data;
            }
        } catch (err) {
            set({ error: err.response?.data?.message || "Login failed", isLoading: false });
            throw err;
        }
    },

    signup: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axios.post(`${API_URL}/signup`, { username, email, password });
            set({ isLoading: false });
            return res.data;
        } catch (err) {
            set({ error: err.response?.data?.message || "Signup failed", isLoading: false });
            throw err;
        }
    },

    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
    }
}));