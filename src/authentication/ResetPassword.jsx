import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";

import { auth } from "../firebase/functions/functions.firebase";
import { confirmPasswordReset } from "firebase/auth";
import { useSelector } from "react-redux";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

const confirmThePasswordReset = async (oobCode, newPassword) => {
  if (!oobCode && !newPassword) return;

  return await confirmPasswordReset(auth, oobCode, newPassword);
};

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
   const { auth: stateAuth } = useSelector((state) => state.auth);

   useEffect(() => {
     if (stateAuth?.email) {
       navigate("/");
     }
   }, [stateAuth]);
  const [searchParams] = useSearchParams();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;
  let oobCode = searchParams.get("oobCode");

  const resetFormFields = () => {
    return setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (password !== confirmPassword) {
      ErrorNotify("Passwords did not match.");
      return;
    }

    try {
      setLoading(true);
      if (oobCode) {
        await confirmThePasswordReset(oobCode, confirmPassword);
        resetFormFields();
        setLoading(false);
        InfoNotify("Success! Your Password change successfully");
        navigate("/login")
      } else {
        ErrorNotify("missing oobCode");
        setLoading(false);
        return;
      }
    } catch (error) {
      if (error.code === "auth/invalid-action-code") {
        ErrorNotify("Something is wrong; try again later.");
      }
      ErrorNotify(error.message);
      setLoading(false);
      return
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
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
      <h2>Reset Password</h2>
      <form className="w-50" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">New password</label>
          <br />
          <input
            required
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter new password"
            
          />
          <br />
          <label htmlFor="">Confirm new password</label>
          <br />
          <input
            required
            className="form-control"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
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
            {loading ? "Loading..." : "Save Password"}
          </button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default ResetPassword;
