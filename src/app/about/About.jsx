import styles from "./About.scss";
import Header from "../header/Header.jsx";
import AboutContent from "../../About.md";

function About({ visible, setVisible, isDarkStyle }) {
  function getActiveClass() {
    if (visible) return styles.aboutActive;
    else return "";
  }

  function getStyle() {
    if (isDarkStyle) return styles.darkTheme;
    else return styles.lightTheme;
  }

  return (
    <div className={`${styles.about} ${getActiveClass()} ${getStyle()}`}>
      <div className={styles.aboutInner}>
        <Header
          text="About"
          onClose={() => setVisible(false)}
          isDarkStyle={isDarkStyle}
        ></Header>
        <div
          className={styles.aboutBody}
          dangerouslySetInnerHTML={{ __html: AboutContent }}
        ></div>
      </div>
    </div>
  );
}

export default About;
