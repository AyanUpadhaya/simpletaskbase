import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"
import { logOut } from "../firebase/functions/functions.firebase";
import Navbar from "../components/shared/Navbar/Navbar";

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="container">
      <Navbar user={user} logOut={logOut}></Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout