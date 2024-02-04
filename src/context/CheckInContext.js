// CheckInContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase'; // Import your Firestore configuration
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { format } from 'date-fns'; // For formatting dates
import { useAuth } from './AuthContext';

const CheckInContext = createContext();

export const useCheckIn = () => useContext(CheckInContext);

export const CheckInProvider = ({ children }) => {

  const {currentUser} = useAuth()

  const [currentCheckIn, setCurrentCheckIn] = useState(null);

  // Function to add or update a check-in
  const addOrUpdateCheckIn = async (checkInData) => {
    console.log(checkInData)
    const today = format(new Date(), 'yyyy-MM-dd');
    const docId = currentUser.uid + '_' + today; // Create a unique doc ID based on user ID and date
    const docRef = doc(db, 'check-ins', docId);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Update existing document
        await setDoc(docRef, checkInData, { merge: true });
      } else {
        // Create a new document
        await setDoc(docRef, checkInData);
      }

      setCurrentCheckIn(checkInData);
    } catch (error) {
      console.error("Error adding/updating check-in: ", error);
    }
  };

  // Optionally, fetch current check-in data on component mount or user change
  useEffect(() => {
    // Define a function to fetch the current check-in (if needed)
    const fetchCurrentCheckIn = async (userId) => {
      // Implementation similar to addOrUpdateCheckIn, but for fetching
      // Remember to handle loading and error states as needed
    };

    // Call fetchCurrentCheckIn here if auto-fetching current check-in on load
  }, []); // Add dependencies as needed, e.g., userId

  const value = {
    currentCheckIn,
    addOrUpdateCheckIn,
  };

  return (
    <CheckInContext.Provider value={value}>
      {children}
    </CheckInContext.Provider>
  );
};