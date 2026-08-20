import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

function Modal({ children, onClose, ariaLabel = "Dialog", overlayClassName = "", modalClassName = "" }) {
  const rootRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement;
    const root = rootRef.current;
    const body = document.body;
    if (body) body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose && onClose();
      }
      if (e.key === "Tab") {
        // simple focus trap
        const focusable = root.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);

    // focus the first focusable element inside
    setTimeout(() => {
      const focusable = root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) focusable[0].focus();
      else root.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKey);
      if (body) body.style.overflow = "auto";
      if (previouslyFocused.current && previouslyFocused.current.focus) previouslyFocused.current.focus();
    };
  }, [onClose]);

  const modalNode = (
    <div className={`overlay ${overlayClassName}`} onMouseDown={onClose}>
      <div
        className={`modal modal-animate ${modalClassName}`}
        role="dialog"
        aria-label={ariaLabel}
        aria-modal="true"
        ref={rootRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  const mount = document.getElementById("modal-root") || document.body;
  return createPortal(modalNode, mount);
}

export default Modal;
