import "../styles/_reset.scss";
import styles from "./App.scss";
import Github from "./icons/Github.svg";
import Download from "./icons/Download.svg";
import Copy from "./icons/Copy.svg";
import Share from "./icons/Share.svg";
import SettingsIco from "./icons/Settings.svg";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import DarkModeSwitch from "./dark-mode-switch/DarkModeSwitch.jsx";
import Notification from "./notification/Notification.jsx";
import About from "./about/About.jsx";
import {
  TreeCreationError,
  indentedBlocks,
  createTree,
  generateTree,
  addParents,
} from "./createTree.mjs";
import { Settings, BooleanItem, EnumItem } from "./settings/Settings.jsx";
import { saveAs } from "file-saver";

document.querySelector("body").onkeydown = (ev) => {
  if (ev.key == "Tab") ev.preventDefault();
};

/**
 * @param {Object} props
 * @param {string} props.text
 * @param {boolean} props.isDarkStyle
 */
function CopyButton({ text, isDarkStyle }) {
  const duration = 1000;
  const [activated, setActivated] = useState(false);

  return (
    <button
      style={{
        position: "relative",
      }}
      className={styles.actionButton}
      onClick={() => {
        setActivated(true);
        navigator.clipboard.writeText(text);
        setTimeout(() => setActivated(false), duration);
      }}
    >
      <Copy className={styles.copyIcon} />

      <Notification
        text="Copied!"
        onClick={() => setActivated(false)}
        active={activated}
        isDarkStyle={isDarkStyle}
      />
    </button>
  );
}

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

/**
 * @param {string} text
 * @returns {string}
 */
function highlight(text) {
  let parts = [];
  for (let [indent, content] of indentedBlocks(text)) {
    let blocks = Math.floor(indent / 2);
    let line = [];

    let i = 0;
    for (; i < blocks - 1; ++i) {
      line.push("<span>  </span>");
    }

    if (blocks - i == 1) {
      content = "  " + content;
    }

    if (indent - blocks * 2 != 0) {
      content = " " + content;
    }

    line.push(content);
    parts.push(line.join(""));
  }
  return parts.join("\n");
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

  const fancyTree = {
    leafBranchChar: "└",
    branchChar: "├",
    straightBranchChar: "│",
  };
  const asciiTree = {
    leafBranchChar: "+",
    branchChar: "|",
    straightBranchChar: "|",
  };
  const [treeStyle, setTreeStyle] = useState(fancyTree);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [dotRoot, setDotRoot] = useState(false);
  const [parentNodes, setParentNodes] = useState(false);
  const [trailingSlash, setTrailingSlash] = useState(false);

  const [aboutVisible, setAboutVisible] = useState(false);

  function processTree(code) {
    let tree = createTree(code);
    if (dotRoot) {
      tree = [".", tree];
    }
    addParents(tree, parentNodes, trailingSlash);
    return generateTree(tree, treeStyle);
  }

  let tree = "";
  let error = null;

  try {
    tree = processTree(code);
  } catch (e) {
    if (e instanceof TreeCreationError) {
      error = e;
    }
  }

  function createOutputContent() {
    if (error) {
      return (
        <pre className={styles.outputWindowError}>{`${error.message}`}</pre>
      );
    }
    return <pre className={styles.outputWindowText}>{tree}</pre>;
  }

  let isDarkStyle = themeState.name != "light";

  document.querySelectorAll("textarea").forEach((textarea) => {
    const initialHeight = textarea.scrollHeight;
    textarea.style.height = initialHeight + "px";
    textarea.style.overflowY = "hidden";

    textarea.addEventListener("input", () => {
      textarea.style.height = initialHeight + "px";
      textarea.style.height = textarea.scrollHeight + "px";
    });
  });

  return (
    <main className={`${styles.main} ${themeState.style}`}>
      <div className={styles.flexContainer}>
        <div className={styles.container}>
          <div className={styles.window}>
            <div className={styles.header}>
              <a href="#" className="github-repo-link">
                <Github className={styles.githubIcon} />
              </a>
              <div className={styles.headerUserActions}>
                <div className={styles.headerShareActions}>
                  <button className={styles.actionButton}>
                    <Download
                      className={styles.downloadIcon}
                      onClick={() => {
                        let blob = new Blob([tree], {
                          type: "text/plain;charset=utf-8",
                        });
                        saveAs(blob, "tree.txt");
                      }}
                    />
                  </button>
                  <CopyButton text={tree} isDarkStyle={isDarkStyle} />
                  <button className={styles.actionButton}>
                    <Share className={styles.shareIcon} />
                  </button>
                </div>
                <button
                  className={styles.actionButton}
                  onClick={() => setSettingsVisible(!settingsVisible)}
                >
                  <SettingsIco className={styles.settingsIcon} />
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
                  highlight={highlight}
                  tabSize={2}
                />
              </div>
              <div className={styles.outputWindow}>{createOutputContent()}</div>
              <Settings
                visible={settingsVisible}
                setVisible={setSettingsVisible}
                isDarkStyle={isDarkStyle}
              >
                <EnumItem
                  title="Tree Style"
                  values={["fancy", "ascii"]}
                  defaultValue="fancy"
                  onChange={(result) => {
                    if (result === "fancy") {
                      setTreeStyle(fancyTree);
                    } else if (result === "ascii") {
                      setTreeStyle(asciiTree);
                    }
                  }}
                  isDarkStyle={isDarkStyle}
                />
                <BooleanItem
                  title="Insert ‘.’ as root node"
                  onToggle={() => setDotRoot(!dotRoot)}
                  isDarkStyle={isDarkStyle}
                ></BooleanItem>
                <BooleanItem
                  title="Full node path"
                  onToggle={() => setParentNodes(!parentNodes)}
                  isDarkStyle={isDarkStyle}
                ></BooleanItem>
                <BooleanItem
                  title="Trailing slash"
                  onToggle={() => setTrailingSlash(!trailingSlash)}
                  isDarkStyle={isDarkStyle}
                ></BooleanItem>
              </Settings>
              <About
                visible={aboutVisible}
                setVisible={setAboutVisible}
                isDarkStyle={isDarkStyle}
              />
            </div>
            <div
              className={styles.footer}
              style={{ position: "relative", zIndex: 1 }}
            >
              <button className={styles.usageBtn}>
                <p
                  className={styles.usageBtnText}
                  onClick={() => setAboutVisible(!aboutVisible)}
                >
                  How to use?
                </p>
              </button>
              <p className={styles.author}>
                Created by{" "}
                <a href="#" className={styles.authorLink}>
                  glebzlat
                </a>
              </p>
            </div>
          </div>{" "}
        </div>
      </div>
    </main>
  );
}

export default App;
