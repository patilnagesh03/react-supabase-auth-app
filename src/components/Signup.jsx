import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/SigninSignup.css";
import { useAuth } from "../Context/AuthContext";
// import { useSnackbar } from "../Context/SnackbarContext";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { signUpNewUser } = useAuth();
  // const { showSnackbar } = useSnackbar();

  // console.log(session);
  // console.log(formData.email, formData.password);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signUpNewUser({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        // showSnackbar(
        //   "Account created! Please check your inbox and confirm your email before signing in.",
        //   "info"
        // );
        navigate("/");
      } else {
        setError("an error occured!");
      }
    } catch {
      // showSnackbar(
      //   "Couldn’t create your account. Please check your details and try again.",
      //   "error"
      // );
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <h2 className="title">Create Account</h2>
        <form onSubmit={handleSignUp} className="signup-form">
          {/* <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div> */}
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" disabled={loading} className="submit-button">
            Sign Up
          </button>
        </form>
        <p className="signin-text">
          Already have an account?{" "}
          <Link to="/" className="signin-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
