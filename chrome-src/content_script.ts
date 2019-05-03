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
      //   wrapper.setAttribute("style", "display:grid;");
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

var observer = new MutationObserver(callback);

observer.observe(targetNode, config);

appendInput();
