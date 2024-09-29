import styles from "./Header.scss";
import Close from "../icons/Close.svg";

/**
 * @param {Object} param0
 * @param {string} param0.text
 * @param {() => undefined} param0.onClose
 * @param {boolean} param0.isDarkStyle
 */
function Header({ text, onClose, isDarkStyle }) {
  function getStyle() {
    if (isDarkStyle) return styles.darkTheme;
    else return styles.lightTheme;
  }

  return (
    <div className={`${styles.header} ${getStyle()}`}>
      <header className={styles.headerTitle}>{text}</header>
      <button
        className={styles.headerClose}
        onClick={() => onClose && onClose()}
      >
        <Close className={styles.headerCloseIcon}></Close>
      </button>
      <div className={styles.headerUnderline}></div>
    </div>
  );
}

export default Header;
