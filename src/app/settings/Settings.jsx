import styles from "./Settings.scss";
import Close from "../icons/Close.svg";
import Switch from "../switch/Switch.jsx";

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {Function} props.onToggle
 * @param {boolean} props.isDarkStyle
 */
function BooleanItem({ title, onToggle, isDarkStyle }) {
  return (
    <div className={styles.settingsItem}>
      <Switch isDarkStyle={isDarkStyle} onToggle={onToggle} />
      <p className="settings__item-text">{title}</p>
    </div>
  );
}

/** Settings window
 *
 * @param {Object} props
 * @param {boolean} props.visible is settings window visible
 * @param {Function} props.setVisible visibility state setter
 * @param {boolean} props.isDarkStyle is app dark (true) or light (false) style
 * @param {React.ReactNode} children
 */
function Settings({ visible, setVisible, isDarkStyle, children }) {
  function getActiveClass() {
    if (visible) return styles.settingsActive;
    else return "";
  }

  function getThemeClass() {
    if (isDarkStyle) return styles.darkTheme;
    else return styles.lightTheme;
  }

  return (
    <div
      className={`${styles.settings} ${getActiveClass()} ${getThemeClass()}`}
    >
      <div className={styles.settingsInner}>
        <div className={styles.settingsHeader}>
          <header className={styles.settingsTitle}>Settings</header>
          <button
            className={styles.settingsClose}
            onClick={() => setVisible(false)}
          >
            <Close className={styles.settingsCloseIcon} fill={"#fff"} />
          </button>
          <div className={styles.settingsHeaderUnderline}></div>
        </div>
        <div className={styles.settingsBody}>
          <div className={styles.settingsList}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export { Settings, BooleanItem };
