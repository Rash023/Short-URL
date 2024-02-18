import React, { useEffect, useRef } from "react";
import Clipboard from "clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const CopyToClipboardButton = ({ textToCopy }) => {
  const buttonRef = useRef(null);
  let clipboard = null;

  useEffect(() => {
    clipboard = new Clipboard(buttonRef.current, {
      text: () => textToCopy,
    });

    clipboard.on("success", () => {
      alert("Text copied to clipboard");
    });

    clipboard.on("error", () => {
      alert("Failed to copy text to clipboard");
    });

    return () => {
      if (clipboard) {
        clipboard.destroy();
      }
    };
  }, [textToCopy]);

  return (
    <button ref={buttonRef} className="px-2">
      <FontAwesomeIcon icon={faCopy} />
    </button>
  );
};

export default CopyToClipboardButton;
