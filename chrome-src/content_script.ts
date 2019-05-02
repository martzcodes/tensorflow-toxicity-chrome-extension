import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

const BUTTON_TEXT = "toxic?";

// The minimum prediction confidence.
const threshold = 0.9;
let toxicityModel: toxicity.ToxicityClassifier = null;

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
console.log("loading toxicity model...");
toxicity.load(threshold, []).then(model => {
  console.log("toxicity model loaded");
  toxicityModel = model;
  const sentences = ["you suck"];

  //   model.classify(sentences).then(predictions => {
  //     // `predictions` is an array of objects, one for each prediction head,
  //     // that contains the raw probabilities for each input along with the
  //     // final prediction in `match` (either `true` or `false`).
  //     // If neither prediction exceeds the threshold, `match` is `null`.

  //     console.log(predictions);
  //     /*
  //     prints:
  //     {
  //       "label": "identity_attack",
  //       "results": [{
  //         "probabilities": [0.9659664034843445, 0.03403361141681671],
  //         "match": false
  //       }]
  //     },
  //     {
  //       "label": "insult",
  //       "results": [{
  //         "probabilities": [0.08124706149101257, 0.9187529683113098],
  //         "match": true
  //       }]
  //     },
  //     ...
  //      */
  //   });
});

function shouldAppend(inp: Element) {
  const buttons = inp.parentElement.querySelectorAll("button");
  if (buttons.length === 1) {
    if (buttons[0].innerHTML === BUTTON_TEXT) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

function analyze() {
  console.log("button clicked");
  const parent = (this as any).parentNode;
  let val = parent.querySelector("textarea").value;
  if (!val) {
    val = parent.querySelector("[role='textbox']");
  }
  console.log(val);
  console.log(toxicityModel);
  toxicityModel.classify(val).then(predictions => {
    console.log(predictions);
    const wrapper = document.createElement("div");
    const resultText = predictions
      .filter(pred => {
        return (
          pred.results.filter(pr => {
            return pr.match;
          }).length > 0
        );
      })
      .map(pred => pred.label);
    const results = document.createTextNode(resultText.join(", "));
    wrapper.appendChild(results);
    parent.appendChild(wrapper);
  });
}

function appendInput() {
  const inputs = [
    ...document.querySelectorAll("textarea"),
    ...document.querySelectorAll("[role='textbox']")
  ];

  inputs.forEach(inp => {
    if (shouldAppend(inp)) {
      const button = document.createElement("button");
      button.innerHTML = BUTTON_TEXT;
      button.onclick = analyze;
      const wrapper = document.createElement("div");
      wrapper.setAttribute("style", "display:grid;");
      inp.parentElement.insertBefore(wrapper, inp);
      wrapper.appendChild(inp);
      wrapper.appendChild(button);
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
