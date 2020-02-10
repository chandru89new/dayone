import React, { useState, useEffect } from "react";
import "./style.sass";

const getData = key => JSON.parse(localStorage.getItem(key));
const setD = key => content => localStorage.setItem(key, content);
const beautify = string => JSON.stringify(string, null, 2);
const pipe = (...fns) => arg => fns.reduce((val, currFn) => currFn(val), arg);

function RawForms() {
  const keys = Object.keys(localStorage);
  const [data, setData] = useState({ key: "tasks" });
  const [contents, setContents] = useState({ data: "" });
  const changeContent = e => setContents({ data: e.target.value });
  const changeData = e => setData({ key: e.target.value });

  const saveContent = () => {
    setD(data.key)(contents.data);
  };

  useEffect(() => {
    const c = pipe(getData, beautify)(data.key);
    setContents({ data: c });
  }, [data]);

  return (
    <div className="raw-container">
      <div>
        <select defaultValue={data} onChange={changeData}>
          {keys.map(key => (
            <option value={key}>{key}</option>
          ))}
        </select>
      </div>
      <div>
        <textarea value={contents.data} onChange={changeContent}></textarea>
      </div>
      <div>
        <a href="#" onClick={saveContent}>
          Save
        </a>
      </div>
    </div>
  );
}
export default RawForms;
