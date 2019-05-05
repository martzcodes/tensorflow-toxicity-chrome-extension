// Saves options to chrome.storage
function save_options() {
  var textarea = (document.getElementById("textarea") as any).checked;
  chrome.storage.sync.set(
    {
      textarea: textarea
    },
    function() {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value textarea = true.
  chrome.storage.sync.get(
    {
      textarea: false
    },
    function(items) {
      (document.getElementById("textarea") as any).checked = items.textarea;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
