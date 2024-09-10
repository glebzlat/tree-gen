import "../styles/_reset.scss";
import styles from "./App.scss";
import Github from "./icons/Github.svg";
import Download from "./icons/Download.svg";
import Copy from "./icons/Copy.svg";
import Share from "./icons/Share.svg";
import Settings from "./icons/Settings.svg";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import DarkModeSwitch from "./dark-mode-switch/DarkModeSwitch.jsx";

function detectTheme(callback) {
  const getThemeName = (e) => (e && e.matches ? "dark" : "light");
  const mq = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    mq.addEventListener("change", (e) => callback(getThemeName(e)));
    if (callback) {
      console.log(`current theme on startup: ${getThemeName(mq)}`);
      callback(getThemeName(mq));
    }
    return () => mq.removeEventListener("change", () => {});
  }, []);
}

function App() {
  const lightTheme = { name: "light", style: styles.lightTheme };
  const darkTheme = { name: "dark", style: styles.darkTheme };
  const [themeState, setTheme] = useState(lightTheme);

  detectTheme((name) => setThemeClass(name));

  function setThemeClass(name) {
    if (name == "light") {
      setTheme(lightTheme);
    } else if (name == "dark") {
      setTheme(darkTheme);
    }
  }

  const [code, setCode] = useState("some code");

  return (
    <main className={`${styles.main} ${themeState.style}`}>
      <div className={styles.container}>
        <div className={styles.window}>
          <div className={styles.header}>
            <a href="#" className="github-repo-link">
              <Github className={styles.githubIcon} />
            </a>
            <div className={styles.headerUserActions}>
              <div className={styles.headerShareActions}>
                <button className={styles.actionButton}>
                  <Download className={styles.downloadIcon} />
                </button>
                <button className={styles.actionButton}>
                  <Copy className={styles.copyIcon} />
                </button>
                <button className={styles.actionButton}>
                  <Share className={styles.shareIcon} />
                </button>
              </div>
              <button className={styles.actionButton}>
                <Settings className={styles.settingsIcon} />
              </button>
              <DarkModeSwitch
                onChange={(state) => setThemeClass(state)}
                initialState={themeState.name}
              />
            </div>
          </div>
          <div className={styles.windowBody}>
            <div className={styles.codeInput}>
              <Editor
                className={styles.codeEditor}
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => code}
                tabSize={2}
              />
            </div>
            <div className={styles.outputWindow}>
              <pre className={styles.outputWindowText}>{code}</pre>
            </div>
          </div>
          <div className={styles.footer}>
            <button className={styles.usageBtn}>
              <p className={styles.usageBtnText}>How to use?</p>
            </button>
            <p className={styles.author}>
              Created by{" "}
              <a href="#" className={styles.authorLink}>
                glebzlat
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
