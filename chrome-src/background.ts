import * as tf from "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

// The minimum prediction confidence.
const threshold = 0.9;

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.
toxicity.load(threshold, []).then(model => {
  const sentences = ["you suck"];

  model.classify(sentences).then(predictions => {
    // `predictions` is an array of objects, one for each prediction head,
    // that contains the raw probabilities for each input along with the
    // final prediction in `match` (either `true` or `false`).
    // If neither prediction exceeds the threshold, `match` is `null`.

    console.log(predictions);
    /*
    prints:
    {
      "label": "identity_attack",
      "results": [{
        "probabilities": [0.9659664034843445, 0.03403361141681671],
        "match": false
      }]
    },
    {
      "label": "insult",
      "results": [{
        "probabilities": [0.08124706149101257, 0.9187529683113098],
        "match": true
      }]
    },
    ...
     */
  });
});

var onElementReady = sel => {
  return new Promise(resolve => {
    var waitForElement = () => {
      const $element = document.querySelector(sel);
      if ($element) {
        resolve($element);
      } else {
        window.requestAnimationFrame(waitForElement);
      }
    };
    waitForElement();
  });
};

var targetNode = document.body;

var config = {
  childList: true,
  subtree: true
};

// Callback function to execute when mutations are observed
var callback = mutationsList => {
  mutationsList.forEach(mut => {
    console.log(mut);
  });
};

var observer = new MutationObserver(callback);

observer.observe(targetNode, config);
