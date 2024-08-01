import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
import { handlePasswordResetEmail } from "../firebase/functions/functions.firebase";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { auth: stateAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (stateAuth?.email) {
      navigate("/");
    }
  }, [stateAuth]);

  const location = useLocation();
  let from = "/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    try {
      setLoading(true);
      await handlePasswordResetEmail(email);
      setLoading(false);
      InfoNotify("Mail has been sent");
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/user-not-found") {
         
        ErrorNotify("User not found, try again!");   
      }else{
        ErrorNotify(error.code);  
      }
      
      setLoading(false);
    }
  };
  return (
    <div
      className="container py-4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h2>Forgot Password</h2>
      <form className="w-50" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            required
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter email..."
          />
        </div>
        <br />

        <br />
        <div>
          <button
            disabled={loading}
            className="btn btn-secondary w-100"
            type="submit"
          >
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </div>
        <br />
        <div>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
