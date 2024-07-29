import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import useAuthCheck from "./hooks/useAuthCheck";
import { NotifyContainer } from "./utils/getNotify";
import app from "./firebase/firebase.config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOutUser, saveAuthData } from "./features/authSlice/authSlice";

const App = () => {
  const Router = router;
  // const authChecked = useAuthCheck();
  const dispatch = useDispatch();

  let auth = getAuth(app);

  const extractUserData = (user) => {
    if (!user) return null;
    const { uid, email, displayName, photoURL } = user;
    return { uid, email, displayName, photoURL };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = extractUserData(currentUser);
        dispatch(saveAuthData(userData));
      } else {
        dispatch(logOutUser());
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <RouterProvider router={Router}></RouterProvider>
      <NotifyContainer></NotifyContainer>
    </div>
  );
};

export default App;