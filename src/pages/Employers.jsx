import { useNavigate } from "react-router-dom";
import FeedbackModal from "../components/FeedbackModal";

function Employers({ currentUser, openLogin, openSignup }) {
  const navigate = useNavigate();

  // if not signed in or not an employer, show feedback
  if (!currentUser) {
    return (
      <div style={{ padding: 28 }}>
        <h2>Employers</h2>
        <p>You need to sign in as an employer to access this page.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => openLogin && openLogin()} className="primary-btn">Sign in</button>
          <button onClick={() => openSignup && openSignup()} className="secondary-btn">Create account</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    );
  }

  if (currentUser.role !== "employer") {
    return (
      <div style={{ padding: 28 }}>
        <h2>Access denied</h2>
        <p>Only registered employers can access employer features and listings.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 28 }}>
      <h2>Employer Dashboard</h2>
      <p>Welcome, {currentUser.fullName || currentUser.email} — manage your job posts and invitations here.</p>
      {/* Placeholder: employer features go here */}
    </div>
  );
}

export default Employers;
