import styles from "./Notification.scss";

/** Notification with a triangle component
 *
 * @param {Object} props
 * @param {string} props.text
 * @param {() => undefined} props.onClick
 * @param {boolean} props.active
 * @param {boolean} props.isDarkStyle
 */
function Notification({ text, onClick, active, isDarkStyle }) {
  function getActiveClass() {
    if (active) return styles.notificationActive;
    else return "";
  }

  function getStyle() {
    if (isDarkStyle) return styles.darkTheme;
    else return styles.lightTheme;
  }

  return (
    <div
      className={`${styles.notification} ${getActiveClass()} ${getStyle()}`}
      // XXX: onClick somewhat does not work
      onClick={() => onClick && onClick()}
    >
      <p className={styles.notificationText}>{text}</p>
      <div className={styles.notificationTriangle}></div>
    </div>
  );
}

export default Notification;
