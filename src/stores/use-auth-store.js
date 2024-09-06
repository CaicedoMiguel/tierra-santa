import { create } from "zustand"; // Import the create function from Zustand for state management
import { auth } from "../firebase.config"; // Import Firebase authentication configuration
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth"; // Import Firebase authentication methods

/**
 * Auth Store
 * 
 * This Zustand store manages authentication state and provides methods
 * for logging in with Google, observing authentication state changes,
 * and logging out.
 */
const useAuthStore = create((set) => ({
  user: null, // State to store the current authenticated user
  loading: true, // State to indicate if authentication is in progress
  error: null, // State to store any authentication errors

  /**
   * Logs in a user using Google authentication via a popup.
   * 
   * @returns {Promise<void>} - A promise that resolves when login is complete.
   */
  loginGoogleWithPopup: async () => {
    set({ loading: true, error: null }); // Set loading state and clear error
    try {
      const provider = new GoogleAuthProvider(); // Create a new GoogleAuthProvider instance
      const result = await signInWithPopup(auth, provider); // Sign in with a Google popup
      set({ user: result.user, loading: false }); // Update state with authenticated user
    } catch (error) {
      console.error("Error during Google login:", error); // Log any errors
      set({ error: error.message, loading: false }); // Update state with error message
    }
  },

  /**
   * Observes changes in authentication state.
   * 
   * @returns {Function} - A function that unsubscribes from the auth state listener.
   */
  observeAuthState: () => {
    return onAuthStateChanged(auth, (user) => {
      set({ user, loading: false }); // Update state with user info when auth state changes
    });
  },

  /**
   * Logs out the currently authenticated user.
   * 
   * @returns {Promise<void>} - A promise that resolves when logout is complete.
   */
  logout: async () => {
    set({ loading: true, error: null }); // Set loading state and clear error
    try {
      await auth.signOut(); // Sign out the current user
      set({ user: null, loading: false }); // Update state to reflect user is logged out
    } catch (error) {
      console.error("Error during logout:", error); // Log any errors
      set({ error: error.message, loading: false }); // Update state with error message
    }
  },

  /**
   * Clears any existing authentication error.
   */
  clearError: () => set({ error: null }), // Clear error state
}));

export default useAuthStore; // Export the Zustand store for use in other parts of the application
