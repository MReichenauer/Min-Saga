import { useEffect } from "react";
import styles from "./genericModal.module.css";
import Svg from "@components/svg/svg";
import { IconEnum } from "@components/svg/Models";
type GenericModalProps = {
  displayModal: boolean;
  title?: string;
  content?: React.ReactNode;
  primaryButtonAction?: () => void;
  primaryButtonText?: string;
  disablePrimaryButton?: boolean;
  successButtonAction?: () => void;
  successButtonText?: string;
  disableSuccessButton?: boolean;
  dangerButtonAction?: () => void;
  dangerButtonText?: string;
  disableDangerButton?: boolean;
  onClose?: () => void;
  closeButton?: boolean;
};

const GenericModal: React.FC<GenericModalProps> = ({
  displayModal,
  title,
  content,
  primaryButtonAction,
  primaryButtonText,
  disablePrimaryButton,
  successButtonAction,
  successButtonText,
  disableSuccessButton,
  dangerButtonAction,
  dangerButtonText,
  disableDangerButton,
  onClose,
  closeButton = true,
}) => {
  const handlePrimaryButtonClick = () => {
    primaryButtonAction?.();
    onClose?.();
  };

  const handleSuccessButtonClick = () => {
    successButtonAction?.();
    onClose?.();
  };
  useEffect(() => {
    if (displayModal) {
      document.body.classList.add("noScroll");
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("noScroll");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [displayModal, onClose]);

  if (!displayModal) {
    return null;
  }
  return (
    <div aria-label="modal" className={styles.modalContainer}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header className={styles.modalHeader}>
          {title && <h2 id="modalTitle">{title}</h2>}
          {closeButton && (
            <button className="autumnDangerButton" onClick={onClose}>
              <Svg size={20} icon={IconEnum.CLOSE} />
            </button>
          )}
        </header>
        <div className={styles.modalBody}>{content && <div id="modalDescription">{content}</div>}</div>
        <footer className={styles.modalFooter}>
          {" "}
          {successButtonAction && successButtonText && (
            <button className="autumnSuccessButton" onClick={handleSuccessButtonClick} disabled={disableSuccessButton}>
              {successButtonText}
            </button>
          )}
          {primaryButtonAction && primaryButtonText && (
            <button className="autumnPrimaryButton" onClick={handlePrimaryButtonClick} disabled={disablePrimaryButton}>
              {primaryButtonText}
            </button>
          )}
          {dangerButtonAction && dangerButtonText && (
            <button className="autumnDangerButton" onClick={dangerButtonAction} disabled={disableDangerButton}>
              {dangerButtonText}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default GenericModal;
