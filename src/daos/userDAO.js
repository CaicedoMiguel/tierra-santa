import {
    collection,
    doc,
    getDoc,
    deleteDoc,
    updateDoc,
    addDoc,
  } from "firebase/firestore"; // Import Firestore functions for CRUD operations
  
  import { db } from "../firebase.config"; // Import Firestore database configuration
  
  /**
   * UserDAO Class
   * 
   * This class provides methods for interacting with the Firestore database
   * specifically for managing user documents in the "users" collection.
   */
  class UserDAO {
    constructor() {
      this.collectionRef = collection(db, "users"); // Reference to the "users" collection in Firestore
    }
  
    /**
     * Retrieve a user document by its ID.
     * 
     * @param {string} id - The ID of the user document to retrieve.
     * @returns {Promise<{success: boolean, data?: object, error?: Error}>} - 
     * An object containing the success status and either the user data or an error.
     */
    async getUserById(id) {
      try {
        const userDoc = await getDoc(doc(this.collectionRef, id)); // Get the document reference
        if (userDoc.exists()) {
          return { success: true, data: userDoc.data() }; // Document exists, return data
        } else {
          return { success: false, data: null }; // Document does not exist
        }
      } catch (error) {
        console.log("Error getting document:", error); // Log any errors
        return { success: false, error }; // Return error details
      }
    }
  
    /**
     * Create a new user document.
     * 
     * @param {object} userData - The data to be stored in the new user document.
     * @returns {Promise<{success: boolean, id?: string, error?: Error}>} - 
     * An object containing the success status and the new document ID or an error.
     */
    async createUser(userData) {
      try {
        const docRef = await addDoc(this.collectionRef, userData); // Add a new document to the collection
        console.log("Document written with ID: ", docRef.id); // Log the new document ID
        return { success: true, id: docRef.id }; // Return the document ID
      } catch (error) {
        console.error("Error adding document: ", error); // Log any errors
        return { success: false, error }; // Return error details
      }
    }
  
    /**
     * Update an existing user document.
     * 
     * @param {string} id - The ID of the user document to update.
     * @param {object} userData - The updated data for the user document.
     * @returns {Promise<{success: boolean, error?: Error}>} - 
     * An object containing the success status or an error.
     */
    async updateUser(id, userData) {
      try {
        const userRef = doc(this.collectionRef, id); // Get the document reference
        await updateDoc(userRef, userData); // Update the document with new data
        console.log("Document successfully updated!"); // Log success
        return { success: true }; // Return success status
      } catch (error) {
        console.error("Error updating document: ", error); // Log any errors
        return { success: false, error }; // Return error details
      }
    }
  
    /**
     * Delete a user document by its ID.
     * 
     * @param {string} id - The ID of the user document to delete.
     * @returns {Promise<{success: boolean, error?: Error}>} - 
     * An object containing the success status or an error.
     */
    async deleteUser(id) {
      try {
        await deleteDoc(doc(this.collectionRef, id)); // Delete the document by its ID
        console.log("Document successfully deleted!"); // Log success
        return { success: true }; // Return success status
      } catch (error) {
        console.error("Error removing document: ", error); // Log any errors
        return { success: false, error }; // Return error details
      }
    }
  }
  
  export default new UserDAO(); // Export a singleton instance of UserDAO