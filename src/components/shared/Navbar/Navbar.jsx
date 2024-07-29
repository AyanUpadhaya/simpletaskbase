import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, logOut }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-between py-3 flex-wrap">
      <div>
        <h5 className="cursor-pointer" onClick={() => navigate("/")}>
          SimpleTasksBase
        </h5>
      </div>
      <div className="d-flex gap-2 align-items-center flex-wrap">
        <h5>{user?.email}</h5>

        <button onClick={() => logOut()} className="btn btn-danger">
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
