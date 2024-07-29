import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { saveUserData } from "../features/userSlice/userSlice";
import { saveAuthData } from "../features/authSlice/authSlice";

const PrivateRouter = ({ children }) => {
  const [loading, setLoading] = useState(true);
  // const { user } = useSelector((state) => state.user);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const extractUserData = (user) => {
    if (!user) return null;
    const { uid, email, displayName, photoURL } = user;
    return { uid, email, displayName, photoURL };
  };

  useEffect(() => {
    const localAuth = localStorage?.getItem("koursely-auth");


    if (localAuth) {
      const authData = JSON.parse(localAuth);
      const userData = extractUserData(authData);
      dispatch(saveAuthData(userData));
      dispatch(saveUserData(userData));
      setLoading(false);
    }
    setLoading(false);
  }, []);


  const location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  } else if (auth?.email) {
    return children;
  } else {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }
};

export default PrivateRouter;
