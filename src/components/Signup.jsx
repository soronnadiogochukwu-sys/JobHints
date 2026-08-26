import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import Modal from "./Modal";
import FeedbackModal from "./FeedbackModal";
import API from "../services/api";
import "./Signup.css";

function Signup({ close, onSignup }) {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [role, setRole] = useState("employer");

  const [feedback, setFeedback] = useState(null);
  const [createdUser, setCreatedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !phone.trim() ||
      !address.trim() ||
      !dateOfBirth ||
      !role
    ) {
      setFeedback({
        variant: "error",
        title: "Missing information",
        message: "Please complete every field before signing up.",
      });

      return;
    }

    if (password !== confirmPassword) {
      setFeedback({
        variant: "error",
        title: "Password mismatch",
        message: "Passwords do not match.",
      });

      return;
    }

    try {
      setLoading(true);

      // Backend currently accepts:
      // applicant OR employer
      const backendRole = role;
      console.log("ROLE SELECTED:", role);
      console.log("ROLE SENT TO BACKEND:", backendRole);
      const response = await API.post("/auth/register", {
        name: fullName.trim(),
        companyName:
          role === "employer"
            ? companyName.trim()
            : "",
        email: email.trim(),
        password,
        role: backendRole,
        phone: phone.trim(),
        location: address.trim(),
      });

      console.log("Signup response:", response.data);

      const user = response.data.user;

      setCreatedUser(user);

      setFeedback({
        variant: "success",
        title: "Account created",
        message:
          "Your account has been created successfully. You can now login with your email and password.",
      });
    } catch (error) {
      console.error("Signup error:", error);

      setFeedback({
        variant: "error",
        title: "Registration failed",
        message:
          error.response?.data?.message ||
          "Unable to create your account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      onClose={close}
      ariaLabel="Create account"
      overlayClassName="auth-overlay"
      modalClassName="auth-modal"
    >
      <div className="auth-form">

        <button
          className="close-Signup-button"
          onClick={close}
        >
          <FaXmark />
        </button>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Your Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {role === "employer" && (
            <input
              type="text"
              placeholder="Enter Your Company Name"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              required
            />
          )}

          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Choose Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="employer">
              Employer
            </option>

            <option value="applicant">
              Graduate
            </option>

            <option value="artisan">
              Artisan
            </option>
          </select>

          <input
            type="text"
            placeholder="Enter Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) =>
              setDateOfBirth(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="Signup-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

        </form>

        {feedback && (
          <FeedbackModal
            title={feedback.title}
            message={feedback.message}
            variant={feedback.variant}
            onClose={() => {
              setFeedback(null);

              if (createdUser) {
                setCreatedUser(null);

                close && close();

                // IMPORTANT:
                // Do NOT automatically login here.
                // User should login using the account
                // that was just created.
              }
            }}
          />
        )}

      </div>
    </Modal>
  );
}

export default Signup;