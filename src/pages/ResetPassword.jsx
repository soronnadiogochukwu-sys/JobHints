import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./ResetPassword.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Check that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await API.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(response.data.message);

      // Clear password fields
      setPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">

      <div className="reset-password-card">

        <h1>Reset Password</h1>

        <p>
          Create a new password for your JobHints
          account.
        </p>

        <form onSubmit={handleSubmit}>

          {/* NEW PASSWORD */}

          <label htmlFor="password">
            New Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* CONFIRM PASSWORD */}

          <label htmlFor="confirmPassword">
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          {/* ERROR */}

          {error && (
            <p className="reset-error">
              {error}
            </p>
          )}

          {/* SUCCESS */}

          {message && (
            <p className="reset-success">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

        {/* LOGIN */}

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

export default ResetPassword;