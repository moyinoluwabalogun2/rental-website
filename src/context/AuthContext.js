import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  auth,
  db,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const fetchUserData = async (uid) => {
    try {
      if (!uid) return null;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error('Firestore fetch error:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setCurrentUser(user);

      if (user) {
        const data = await fetchUserData(user.uid);

        if (data?.role !== 'admin') {
          await signOut(auth); // Kick non-admins
          setUserData(null);
        } else {
          setUserData(data);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      if (!userData || userData.role !== 'admin') {
        await signOut(auth);
        return {
          success: false,
          error: 'Access denied. This account is not an admin.'
        };
      }

      setCurrentUser(userCredential.user);
      setUserData(userData);

      return { success: true, user: userCredential.user, userData };
    } catch (error) {
      let message = 'Login failed. Please try again.';
      if (error.code === 'auth/user-not-found') {
        message = 'Email not found';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Account temporarily locked. Try again later.';
      }
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      setCurrentUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = useMemo(
    () => ({
      currentUser,
      userData,
      role: userData?.role || null,
      loading,
      authChecked,
      login,
      logout
    }),
    [currentUser, userData, loading, authChecked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
