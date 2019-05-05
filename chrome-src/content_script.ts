function shouldAppend(inp: Element) {
  console.log(inp.parentElement.tagName.toLowerCase());
  if (inp.parentElement.tagName.toLowerCase() === "toxicity-container") {
    return false;
  } else {
    return true;
  }
}

function appendInput() {
  const inputs = document.querySelectorAll("textarea");

  inputs.forEach(inp => {
    console.log(inp);
    console.log(shouldAppend(inp));
    if (shouldAppend(inp)) {
      console.log("appending...");
      const wrapper = document.createElement("toxicity-container");
      inp.parentElement.insertBefore(wrapper, inp);
      wrapper.appendChild(inp);
    }
  });
}

var targetNode = document.body;

var config = {
  childList: true,
  subtree: true
};

// Callback function to execute when mutations are observed
var callback = mutationsList => {
  console.log(mutationsList);
  appendInput();
};

chrome.storage.sync.get(
  {
    textarea: false
  },
  function(items) {
    if (items.textarea) {
      var observer = new MutationObserver(callback);

      observer.observe(targetNode, config);

      appendInput();
    }
  }
);

let selectedText = "";

function getSelectedText() {
  var text = "";
  var activeEl: any = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    activeElTagName == "textarea" ||
    (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
      typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  selectedText = text;
  return text;
}

document.onmouseup = document.onkeyup = (document as any).onselectionchange = function() {
  getSelectedText();
};

chrome.runtime.sendMessage({
  from: "content",
  subject: "showPageAction"
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
  // First, validate the message's structure
  if (msg.from === "popup" && msg.subject === "DOMInfo") {
    // Collect the necessary data
    var domInfo = {
      selectedText: selectedText
    };

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});
