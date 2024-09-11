import { useEffect, useState } from "react";
import styles from "./DarkModeSwitch.scss";

function DarkModeSwitch({ onChange, initialState = "light" }) {
  const darkState = {
    name: "dark",
    translate: 85,
    className: styles.darkTheme,
  };
  const lightState = {
    name: "light",
    translate: 0,
    className: styles.lightTheme,
  };
  const darkText = "dark";
  const lightText = "light";

  const [state, setState] = useState(lightState);

  useEffect(() => {
    switch (initialState) {
      case "dark":
        initialState = darkState;
        break;
      case "light":
        initialState = lightState;
        break;
    }

    setState(initialState);
  }, [initialState]);

  function handleChange() {
    if (state.name == "light") {
      setState(darkState);
      onChange && onChange("dark");
    } else {
      setState(lightState);
      onChange && onChange("light");
    }
  }

  return (
    <label className={styles.darkModeSwitch}>
      <input
        onChange={handleChange}
        type="checkbox"
        className={`${styles.darkModeSwitchInput} ${state.className}`}
      />
      <div className={`${styles.darkModeSwitchBody} ${state.className}`}>
        <div
          className={`${styles.darkModeSwitchSlider} ${state.className}`}
          style={{
            transform: `translateX(${state.translate}%)`,
          }}
        >
          <div
            className={`${styles.switchText} ${state.className}`}
            style={{ opacity: state.name == "light" ? "1" : "0" }}
          >
            {lightText}
          </div>
          <div
            className={`${styles.switchText} ${state.className}`}
            style={{ opacity: state.name == "dark" ? "1" : "0" }}
          >
            {darkText}
          </div>
        </div>
      </div>
    </label>
  );
}

export default DarkModeSwitch;
