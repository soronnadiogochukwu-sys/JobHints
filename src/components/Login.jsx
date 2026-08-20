import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Modal from "./Modal";
import FeedbackModal from "./FeedbackModal";
import API from "../services/api";
import "./Login.css";

function Login({ close, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [feedback, setFeedback] = useState(null);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setFeedback({
        variant: "error",
        title: "Missing credentials",
        message: "Please fill in both email and password.",
      });

      return;
    }

    try {
      setLoading(true);

      // ==============================
      // LOGIN THROUGH API
      // ==============================

      const response = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      console.log("Login response:", response.data);

      const { token, user } = response.data;

      // ==============================
      // SAVE AUTHENTICATION
      // ==============================

      localStorage.setItem("token", token);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      setAuthenticatedUser(user);

      setFeedback({
        variant: "success",
        title: "Welcome back",
        message: "You have successfully logged in.",
      });

    } catch (error) {
      console.error("Login error:", error);

      setFeedback({
        variant: "error",
        title: "Login failed",
        message:
          error.response?.data?.message ||
          "Invalid email or password.",
      });

    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackClose = () => {
    setFeedback(null);

    if (authenticatedUser) {
      const user = authenticatedUser;

      setAuthenticatedUser(null);

      // Tell App.jsx that login succeeded
      if (onLogin) {
        onLogin(user);
      }

      // Close login modal
      if (close) {
        close();
      }
    }
  };

  return (
    <Modal
      onClose={close}
      ariaLabel="Login"
      overlayClassName="auth-overlay"
      modalClassName="auth-modal"
    >
      <div className="auth-form">

        {/* CLOSE BUTTON */}
        <button
          type="button"
          className="close-Login-button"
          onClick={close}
        >
          <FaXmark />
        </button>

        <h2>Welcome Back, Login Here!</h2>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="Login-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* FEEDBACK */}
        {feedback && (
          <FeedbackModal
            title={feedback.title}
            message={feedback.message}
            variant={feedback.variant}
            onClose={handleFeedbackClose}
          />
        )}

      </div>
    </Modal>
  );
}

export default Login;