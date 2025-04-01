import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import Cookies from 'js-cookie';

import { initializeAxiosWithToken } from '../lib/axiosinstance';

import { auth, googleProvider } from '../config/firebaseConfig';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Sends a password reset email to the specified email address.
 * @param email - The email address to which the password reset email will be sent.
 * @returns A promise that resolves when the email is sent or rejects with an error.
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log('Password reset email sent successfully.');
  } catch (error) {
    console.log(error.code, error.message);
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.log(error.code, error.message);
    throw new Error(error.message);
  }
};

export const loginGoogleUser = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const getUserData = async (userCredential) => {
  try {
    const user = userCredential.user;

    // Get the ID token
    const accessToken = await user.getIdToken();
    // Initialize Axios with the token if needed
    initializeAxiosWithToken(accessToken);

    // Get the token claims
    const tokenResult = await user.getIdTokenResult();
    const claims = tokenResult.claims;

    // Create a plain JSON representation of the user
    const userJson = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    
    const userType = claims.type;
    // Storing user type and token in cookies
    Cookies.set('userType', userType, { expires: 1, path: '/' });
    Cookies.set('token', accessToken, { expires: 1, path: '/' });

    return {
      user: userJson,
      claims,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
