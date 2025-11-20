import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/SigninSignup.css";
import { useAuth } from "../Context/AuthContext";
import { useSnackbar } from "../Context/SnackbarContext";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { signInUser, signInWithGoogle, signInWithGitHub } = useAuth();
  // const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  // console.log(session);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signInUser({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        showSnackbar("You’ve signed in successfully.", "success");
        // navigate("/");
      } else {
        setError("Incorrect email or password. Please try again");
      }
    } catch {
      showSnackbar("Failed to Sign in!", "error");
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

  const handleSignInWithGoogle = async () => {
    const res = await signInWithGoogle();

    if (res.success) {
      // navigate("/");
      showSnackbar(
        "Signed in with your Google account successfully!",
        "success"
      );
    } else {
      setError("an error occured !");
      showSnackbar(
        "Sign-in with Google failed. Please try again or use another method",
        "error"
      );
    }
  };

  const handleSignInWithGitHub = async () => {
    const res = await signInWithGitHub();

    if (res.success) {
      // navigate("/");
      showSnackbar(
        "Signed in with your GitHub account successfully!",
        "success"
      );
    } else {
      setError("an error occured !");
      showSnackbar(
        "Sign-in with GitHub failed. Please try again or use another method",
        "error"
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSignIn} className="signup-form">
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
            Sign In
          </button>
        </form>
        <p className="signin-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signin-link">
            Sign Up
          </Link>
        </p>
        <div className="signin-google">
          <button
            type="button"
            className="google-btn"
            onClick={handleSignInWithGoogle}
          >
            <img
              src="https://www.citypng.com/public/uploads/preview/google-logo-icon-gsuite-hd-701751694791470gzbayltphh.png"
              alt="Google logo"
              className="google-logo"
              width="20"
              height="20"
            />
            <span>Sign In with Google</span>
          </button>
        </div>

        <div className="signin-google">
          <button
            type="button"
            className="google-btn"
            onClick={handleSignInWithGitHub}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/016/833/872/non_2x/github-logo-git-hub-icon-on-white-background-free-vector.jpg"
              alt="Google logo"
              className="google-logo"
              width="20"
              height="20"
            />
            <span>Sign In with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
