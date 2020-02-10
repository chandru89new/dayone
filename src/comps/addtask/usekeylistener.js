/**
 * useKeyListener() returns toggle | cancel
 */
import { useEffect, useState } from "react";

function useKeyListener() {
  const [mode, setMode] = useState("view");

  const showEditor = () => setMode("edit");
  const hideEditor = () => setMode("view");
  const toggleMode = mode => (mode === "view" ? showEditor() : hideEditor());

  const listener = e => {
    e.preventDefault();
    const [ctrl, key] = [e.ctrlKey, e.keyCode || e.which];
    if (key === 27) {
      hideEditor();
    }
    if (ctrl && key === 32) {
      toggleMode(mode);
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keyup", listener);
    };
  });

  return {
    mode,
    toggleMode
  };
}
export default useKeyListener;
