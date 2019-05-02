// Saves options to chrome.storage.sync.
function save_options() {
  console.log("save");
}

function restore_options() {
  console.log("restore");
}

document.addEventListener("DOMContentLoaded", restore_options);
