export {}

console.log(
  "Live now; make now always the most precious time. Now will never come again."
);

chrome.action.onClicked.addListener(() => {
  console.log("action clicked");
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "toggleChatBox" });
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  try {
    sendChatMessage(request.message)
      .then((response) => {
        console.log("Success:", response);
        sendResponse({ message: response });
        console.log("Response sent");
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse({ error: error.message });
      });
  } catch (error) {
    console.error("Unexpected error:", error);
    sendResponse({ error: "Unexpected error occurred" });
  }
});

async function sendChatMessage(input: string) {
  console.log("from sendChatMessage:", input);

  try {
    const payload = {
      messages: [
        {
          role: "user",
          content: input
        }
      ]
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    };

    const url = "http:localhost:3000/api/chat";

    const response = await fetch(url, requestOptions);
 
    const responseData = await response.text();

    if (response.ok) {
      console.log("Message sent successfully");
      // Handle the response as needed
      // console.log(responseData);
      return responseData;
    } else {
      const errorMessage = `Server responded with an error: ${response.status} - ${response.statusText}`;
      console.error(errorMessage);
      // Handle errors
    }
  } catch (error) {
    console.error("Error occurred:", error);
    // Handle errors
  }
}
