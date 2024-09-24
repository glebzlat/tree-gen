import { useState } from "react";
import styles from "./Switch.scss";

/**
 * Slider switch
 *
 * @param {Object} props
 * @param {boolean} [props.initialState=false]
 * @param {boolean} props.isDarkStyle
 * @param {Function?} props.onToggle
 */
function Switch({ initialState = false, isDarkStyle, onToggle = null }) {
  const [state, setState] = useState(initialState);

  function getTheme() {
    if (isDarkStyle) return styles.darkTheme;
    else return styles.lightTheme;
  }

  function getActive() {
    if (state) return styles.switchActive;
    else return "";
  }

  return (
    <label className={`${styles.switch} ${getTheme()} ${getActive()}`}>
      <input
        type="checkbox"
        onClick={() => {
          setState(!state);
          if (onToggle) onToggle();
        }}
      />
      <span className={styles.switchSlider}></span>
    </label>
  );
}

export default Switch;
