import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../firebase/firebase.config";
import { logOutUser, saveAuthData } from "../features/authSlice/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
 

  useEffect(() => {
    const localAuth = localStorage?.getItem("koursely-auth");

    if (localAuth) {
      const authData = JSON.parse(localAuth);
      if (authData?.accessToken) {
        dispatch(saveAuthData(auth));
      } else {
        dispatch(logOutUser());
      }
    }
     setAuthChecked(true);
  }, []);

  return authChecked;
};

export default useAuthCheck;
