import { useChat } from "ai/react"
import React, { useState } from "react"

export const ChatBox = () => {
  const [showChatBox, setShowChatBox] = useState(true)
  const [responseMessage, setResponseMessage] = useState("")
  const { input, handleInputChange } = useChat()

  const handleClose = () => {
    setShowChatBox(false)
  }

  const handleSubmit = async (input) => {
    try {
      const response = await chrome.runtime.sendMessage({ message: input })
      console.log("response from handleSubmit")
      setResponseMessage(response.message)
    } catch (error) {
      console.error("Error occurred:", error)
    }
  }

  return (
    <>
      {showChatBox && (
        <div
          className="plasmo-z-50 plasmo-flex plasmo-fixed"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            border: "2px solid black"
          }}>
          <div
            className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center"
            style={{ height: "500px", width: "500px" }}>
            <button
              className="plasmo-close-icon"
              style={{ position: "relative",right: "-225px" }}
              onClick={handleClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="2em"
                viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
            <div className="plasmo-flex plasmo-items-center plasmo-m-6 plasmo-h-80">
              {responseMessage && ( 
                <div style={{ overflowY: "auto", maxHeight: "90%" }}>{responseMessage}</div>
              )}
            </div>

            <div className="plasmo-flex plasmo-w-full plasmo-h-15 plasmo-p-6 plasmo-space-x-3 plasmo-align-middle">
              <input
                className="plasmo-text-sm plasmo-rounded plasmo-px-4 plasmo-py-2 plasmo-w-full plasmo-border-2 plasmo-border-black"
                value={input}
                placeholder="Say something..."
                onChange={handleInputChange}
              />
              <button
                className="plasmo-text-sm plasmo-px-8 plasmo-py-2 plasmo-rounded plasmo-bg-lime-50 plasmo-border-2 plasmo-border-lime-600"
                type="submit"
                onClick={() => handleSubmit(input)}>
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
