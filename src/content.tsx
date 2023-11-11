import React, { useState } from "react";
import cssText from "data-text:~style.css";
import type { PlasmoCSConfig } from "plasmo";

import { ChatBox } from "~features/chatbox";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const PlasmoOverlay = () => {
  const [showChatBox, setShowChatBox] = useState(false);

  const handleToggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleChatBox") {
      handleToggleChatBox();
    }
  });

  return (
    <>
      {showChatBox && <ChatBox />}
    </>
  );
};

export default PlasmoOverlay;
