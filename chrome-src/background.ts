chrome.runtime.onMessage.addListener(function(msg, sender) {
  // First, validate the message's structure
  if (msg.from === "content" && msg.subject === "showPageAction") {
    // Enable the page-action for the requesting tab
    if (chrome.pageAction) {
      chrome.pageAction.show(sender.tab.id);
    }
  }
});
