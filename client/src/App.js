import { useState } from "react";
import axios from "axios";
import CopyToClipboardButton from "./components/Clipboard";

import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [responseData, setResponseData] = useState(""); // State to store response data

  const changeHandler = (event) => {
    setUrl(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      console.log(url);
      try {
        const response = await axios.post("http://localhost:4001/url", {
          url: url,
        });
        setResponseData(response.data); // Set response data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700">
      <form className="flex flex-row" onSubmit={submitHandler}>
        <label className="text-white px-3" htmlFor="urlInput">
          <span className="uppercase font-bold floating-animation gemini-font">
            Enter URL -
          </span>
        </label>
        <input
          name="urlInput"
          onChange={changeHandler}
          type="text"
          value={url}
          placeholder="https://example.com"
          className="input rounded px-2 h-[1.8rem]"
          onKeyDown={submitHandler}
        />
      </form>

      <div className="w-[15rem] rounded-md mt-5 justify-center output">
        {/* Check if responseData.response exists before accessing shortId */}
        {responseData.response && (
          <p className="short-url text-white justify-center px-[7rem] flex ">
            {JSON.stringify(responseData.response.shortId)}

            <CopyToClipboardButton
              textToCopy={JSON.stringify(responseData.response.shortId)}
            />
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
