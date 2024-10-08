import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
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
} from "firebase/auth";

import app from "../../public/Firebase/firebase.config";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);

      const userEmail = { email: currentUser?.email } || user?.email;
      setUser(currentUser);

      if (currentUser) {
        axiosPublic
          .post(`/jwt`, userEmail, {
            withCredentials: true,
          })
          .then((res) => {
            setLoading(false);
            console.log(res.data);
          });
      } else {
        axiosPublic
          .post(`/logout`, userEmail, {})
          .then((res) => console.log(res.data));
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [auth, axiosPublic, user]);

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
