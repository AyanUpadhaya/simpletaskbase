import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, auth } from "../firebase/functions/functions.firebase";
import { updateProfile } from "firebase/auth";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
import { addUser } from "../firebase/functions/firebasedb.functions";
import { useSelector } from "react-redux";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [showPassword, setShwoPassword] = useState(false);
  const { auth:stateAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (stateAuth?.email) {
      navigate("/");
    }
  }, [stateAuth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      const result = await createUser(email, password);
      await addUser(fullName, email);
      const loggedUser = result.user;
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });
      InfoNotify("Account Created");
      setLoading(false);

      navigate("/login");
    } catch (error) {
      if (error.code == "auth/email-already-in-use") {
        ErrorNotify("Email already exists");
      } else {
        ErrorNotify(error.code);
      }

      setLoading(false);
      setUser(null);
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
      <h1 className="heading">SimpleTaskBase</h1>
      <h2>Register form</h2>
      <form className="w-50" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Full Name</label>
          <br />
          <input
            onChange={(e) => setFullName(e.target.value)}
            className="form-control"
            type="text"
            name="fullName"
            placeholder="Full Name..."
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="email..."
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="">Password</label>
          <br />
          <div className="password-box">
            <input
              required
              className="form-control"
              type={!showPassword ? "password" : "text"}
              name="password"
              placeholder="password"
            />

            <button
              className="show-btn"
              type="button"
              onClick={() => setShwoPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i class="fa-solid fa-eye-slash"></i>
              )}
            </button>
          </div>
        </div>
        <br />
        <div>
          <button
            className="btn btn-secondary w-100"
            disabled={loading}
            type="submit"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </div>
        <br />
        <div>
          if you have account, please <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
