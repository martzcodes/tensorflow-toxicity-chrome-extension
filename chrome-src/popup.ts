function setDOMInfo(info) {
  console.log("creating element");
  const toxicityElement = document.createElement("toxicity-popup");
  if (info && info.selectedText) {
    toxicityElement.setAttribute("textToAnalyze", info.selectedText);
  }
  document.body.appendChild(toxicityElement);
}

// Once the DOM is ready...
window.addEventListener("DOMContentLoaded", function() {
  // ...query for the active tab...
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    function(tabs) {
      // ...and send a request for the DOM info...
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        // ...also specifying a callback to be called
        //    from the receiving end (content script)
        setDOMInfo
      );
    }
  );
});
