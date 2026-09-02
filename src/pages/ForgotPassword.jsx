import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await API.post(
        "/auth/forgot-password",
        { email }
      );

      setMessage(response.data.message);

      // TEMPORARY:
      // The backend currently returns the reset link.
      if (response.data.resetLink) {
        console.log(
          "PASSWORD RESET LINK:",
          response.data.resetLink
        );
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">

      <div className="forgot-password-card">

        <h1>Forgot Password?</h1>

        <p>
          Enter your email address and we'll help you
          reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {error && (
            <p className="forgot-error">
              {error}
            </p>
          )}

          {message && (
            <p className="forgot-success">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Send Reset Link"}
          </button>

        </form>

        <button
          type="button"
          className="back-login"
          onClick={() =>
            navigate("/", {
              state: { openLogin: true }
            })
          }
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}

export default ForgotPassword;