import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../firebase/functions/functions.firebase";
import { ErrorNotify, InfoNotify } from "../utils/getNotify";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShwoPassword] = useState(false);
  let from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      setLoading(true);
      const result = await loginUser(email, password);
      const loggedUser = result.user;
      if (loggedUser) {
        setLoading(false);
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.code == "auth/invalid-credential") {
        ErrorNotify("Invalid email or password");
      } else {
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
      <h2>Login form</h2>
      <form className="w-50" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email</label>
          <br />
          <input
            required
            className="form-control"
            type="email"
            name="email"
            placeholder="email..."
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
            disabled={loading}
            className="btn btn-secondary w-100"
            type="submit"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        <br />
        <div>
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
        <div>
          if you don't have account, please <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
