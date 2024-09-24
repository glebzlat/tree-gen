import styles from "./Settings.scss";
import Close from "../icons/Close.svg";
import Switch from "../switch/Switch.jsx";

function Settings({ visible, setVisible, isDarkStyle }) {
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
        <Switch isDarkStyle={isDarkStyle} onToggle={() => {}} />
      </div>
    </div>
  );
}

export default Settings;
