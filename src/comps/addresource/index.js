import React, { useState } from "react";
import useKeyListener from "../../helpers/usekeylistener";
import "./style.sass";

const defaultFn = e => {
  console.log("No function given", { args: e });
};

function AddResource({ name, callback = defaultFn, placeholder = "" }) {
  const { mode, toggleMode } = useKeyListener();
  let [resourceName, setResourceName] = useState("");

  const focusInput = id =>
    document.getElementById(id) && document.getElementById(id).focus();

  if (mode === "edit") {
    setTimeout(() => focusInput("resource-input"), 0);
  }

  const handleInput = e => {
    setResourceName(e.target.value);
    if (e.keyCode === 13) {
      callback(e.target.value);
      setResourceName("");
      toggleMode("edit");
    }
  };

  return (
    <span className="add-resource-container">
      {mode === "edit" && (
        <input
          id="resource-input"
          placeholder={placeholder}
          onKeyUp={handleInput}
          defaultValue={resourceName}
        />
      )}
      {mode === "view" && (
        <a href="#" onClick={e => toggleMode("view")}>
          Add {name} (Ctrl + Enter)
        </a>
      )}
    </span>
  );
}

export default AddResource;
