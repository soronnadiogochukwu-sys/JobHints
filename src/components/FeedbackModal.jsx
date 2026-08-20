import { FaThumbsUp, FaCircleXmark, FaCheck } from "react-icons/fa6";
import Modal from "./Modal";
import "./FeedbackModal.css";

function FeedbackModal({
  title,
  message,
  variant = "info",
  onClose,
  primaryLabel,
  secondaryLabel,
  primaryAction,
  secondaryAction,
}) {
  const iconMap = {
    success: <FaThumbsUp />,
    error: <FaCircleXmark />,
    info: <FaCheck />,
  };

  return (
    <Modal
      onClose={onClose}
      ariaLabel={title}
      overlayClassName="feedback-overlay"
      modalClassName={`feedback-modal feedback-${variant}`}
    >
      <div className="feedback-content">
        <div className="feedback-icon">{iconMap[variant]}</div>
        <h2>{title}</h2>
        <p>{message}</p>

        <div style={{ display: "flex", gap: 12 }}>
          {secondaryAction ? (
            <button
              className="feedback-ok"
              onClick={() => {
                secondaryAction();
                onClose && onClose();
              }}
            >
              {secondaryLabel || "Cancel"}
            </button>
          ) : null}

          {primaryAction ? (
            <button
              className="feedback-ok"
              onClick={() => {
                primaryAction();
                onClose && onClose();
              }}
            >
              {primaryLabel || "OK"}
            </button>
          ) : (
            !secondaryAction && (
              <button className="feedback-ok" onClick={onClose}>
                OK
              </button>
            )
          )}
        </div>
      </div>
    </Modal>
  );
}

export default FeedbackModal;
