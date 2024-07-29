import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import { logOut } from "../firebase/functions/functions.firebase";
import Navbar from "../components/shared/Navbar/Navbar";

const Layout = () => {
  const { auth } = useSelector((state) => state.auth);
  return (
    <div className="container">
      <Navbar user={auth} logOut={logOut}></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout