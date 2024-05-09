import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import axios from 'axios';

import app from '../../public/Firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      // console.log(currentUser);
      setLoading(true);
      const userEmail = { email: currentUser?.email } || user?.email;
      setUser(currentUser);
      if (currentUser) {
        axios
          .post('http://localhost:5000/jwt', userEmail, {
            withCredentials: true,
          })
          .then(res => console.log(res.data));
      } else {
        axios
          .post('http://localhost:5000/logout', userEmail, {
            withCredentials: true,
          })
          .then(res => console.log(res.data));
      }
      setTimeout(setLoading, 500, false);
    });

    return () => {
      unSubscribe();
    };
  }, [auth, user]);

  const handleUpdateProfile = (name, photo) => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).then(() => {
      setUser({ ...user, displayName: name, photoURL: photo });
    });
  };

  const logOut = () => {
    setLoading(false);
    return signOut(auth);
  };

  const createUserByEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const githubProvider = new GithubAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    user,
    createUserByEmailAndPassword,
    signInWithEmail,
    signInWithGithub,
    signInWithGoogle,
    logOut,
    loading,
    handleUpdateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
export default AuthProvider;
