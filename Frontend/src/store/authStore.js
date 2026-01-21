import { create } from 'zustand';
import { auth } from '../firebase'; // Ensure this path correctly points to your firebase.js
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  error: null,

  // PERSISTENCE: This checks if a user is already logged in when the app starts
  checkAuth: () => {
    set({ isLoading: true });
    // This returns an unsubscribe function to prevent memory leaks
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user: user, isLoading: false, error: null });
      } else {
        set({ user: null, isLoading: false });
      }
    });
    return unsubscribe;
  },

  signup: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, isLoading: false });
    } catch (err) {
      // Friendly error handling
      const errorMessage = err.code === 'auth/email-already-in-use' 
        ? "Email already exists." 
        : err.message;
      set({ error: errorMessage, isLoading: false });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCredential.user, isLoading: false });
    } catch (err) {
      set({ error: "Invalid email or password", isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, error: null });
    } catch (err) {
      console.error("Logout Error:", err);
    }
  }
}));