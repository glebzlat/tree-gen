import styles from "./Dropdown.scss";
import Arrow from "../icons/Arrow.svg";
import { useEffect, useRef, useState } from "react";

/**
 * @param {Object} props
 * @param {Array<string>} props.variants
 * @param {string?} [props.defaultVariant=null]
 * @param {(string) => undefined} props.onChange
 * @param {boolean} isDarkStyle
 */
function Dropdown({
  variants,
  defaultVariant = null,
  onChange,
  isDarkStyle = false,
}) {
  const ref = useRef(0);
  useClickOutside(ref, () => setActive(false));

  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(defaultVariant || variants[0]);

  function getActiveClass() {
    if (active) return styles.dropdownActive;
    else return "";
  }

  function getStyle() {
    if (isDarkStyle) return styles.darkTheme;
    else return styles.lightTheme;
  }

  return (
    <div
      ref={ref}
      className={`${styles.dropdown} ${getActiveClass()} ${getStyle()}`}
    >
      <div className={styles.cursorBorder}>
        <button
          className={styles.dropdownActivate}
          onClick={() => setActive(!active)}
        >
          <p className={styles.dropdownMainText}>{selected}</p>
          <Arrow className={styles.dropdownArrow} />
        </button>
      </div>
      <div className={styles.dropdownContent}>
        {variants.map((el, idx) => (
          <button
            key={idx}
            className={styles.dropdownItem}
            onClick={() => {
              setSelected(el);
              setActive(false);
              onChange(el);
            }}
          >
            <p className={styles.dropdownItemText}>{el}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Call `onClickOutside` if click outside the ref component detected
 *
 * @param {Ref} ref
 * @param {()=>{}} onClickOutside
 */
function useClickOutside(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

export default Dropdown;
