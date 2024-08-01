import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`h-screen w-full d-flex justify-content-center align-items-center `}
    >
      <div className="text-center d-flex flex-column gap-3 align-items-center">
        <p className="display-1 text-bold">404!</p>
        <p className="display-1">This page does not exist</p>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
