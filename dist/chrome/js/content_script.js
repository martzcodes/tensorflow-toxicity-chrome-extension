/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./chrome-src/content_script.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chrome-src/content_script.ts":
/*!**************************************!*\
  !*** ./chrome-src/content_script.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function shouldAppend(inp) {
    console.log(inp.parentElement.tagName.toLowerCase());
    if (inp.parentElement.tagName.toLowerCase() === "toxicity-container") {
        return false;
    }
    else {
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
chrome.storage.sync.get({
    textarea: false
}, function (items) {
    if (items.textarea) {
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
        appendInput();
    }
});
let selectedText = "";
function getSelectedText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (activeElTagName == "textarea" ||
        (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
            typeof activeEl.selectionStart == "number")) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    }
    else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    selectedText = text;
    return text;
}
document.onmouseup = document.onkeyup = document.onselectionchange = function () {
    getSelectedText();
};
chrome.runtime.sendMessage({
    from: "content",
    subject: "showPageAction"
});
// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2hyb21lLXNyYy9jb250ZW50X3NjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsImZpbGUiOiJjb250ZW50X3NjcmlwdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2hyb21lLXNyYy9jb250ZW50X3NjcmlwdC50c1wiKTtcbiIsImZ1bmN0aW9uIHNob3VsZEFwcGVuZChpbnApIHtcbiAgICBjb25zb2xlLmxvZyhpbnAucGFyZW50RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIGlmIChpbnAucGFyZW50RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwidG94aWNpdHktY29udGFpbmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuZnVuY3Rpb24gYXBwZW5kSW5wdXQoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInRleHRhcmVhXCIpO1xuICAgIGlucHV0cy5mb3JFYWNoKGlucCA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGlucCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNob3VsZEFwcGVuZChpbnApKTtcbiAgICAgICAgaWYgKHNob3VsZEFwcGVuZChpbnApKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFwcGVuZGluZy4uLlwiKTtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidG94aWNpdHktY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgaW5wLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGlucCk7XG4gICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGlucCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbnZhciB0YXJnZXROb2RlID0gZG9jdW1lbnQuYm9keTtcbnZhciBjb25maWcgPSB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWVcbn07XG4vLyBDYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gbXV0YXRpb25zIGFyZSBvYnNlcnZlZFxudmFyIGNhbGxiYWNrID0gbXV0YXRpb25zTGlzdCA9PiB7XG4gICAgY29uc29sZS5sb2cobXV0YXRpb25zTGlzdCk7XG4gICAgYXBwZW5kSW5wdXQoKTtcbn07XG5jaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7XG4gICAgdGV4dGFyZWE6IGZhbHNlXG59LCBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICBpZiAoaXRlbXMudGV4dGFyZWEpIHtcbiAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoY2FsbGJhY2spO1xuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldE5vZGUsIGNvbmZpZyk7XG4gICAgICAgIGFwcGVuZElucHV0KCk7XG4gICAgfVxufSk7XG5sZXQgc2VsZWN0ZWRUZXh0ID0gXCJcIjtcbmZ1bmN0aW9uIGdldFNlbGVjdGVkVGV4dCgpIHtcbiAgICB2YXIgdGV4dCA9IFwiXCI7XG4gICAgdmFyIGFjdGl2ZUVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICB2YXIgYWN0aXZlRWxUYWdOYW1lID0gYWN0aXZlRWwgPyBhY3RpdmVFbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgOiBudWxsO1xuICAgIGlmIChhY3RpdmVFbFRhZ05hbWUgPT0gXCJ0ZXh0YXJlYVwiIHx8XG4gICAgICAgIChhY3RpdmVFbFRhZ05hbWUgPT0gXCJpbnB1dFwiICYmXG4gICAgICAgICAgICAvXig/OnRleHR8c2VhcmNofHBhc3N3b3JkfHRlbHx1cmwpJC9pLnRlc3QoYWN0aXZlRWwudHlwZSkgJiZcbiAgICAgICAgICAgIHR5cGVvZiBhY3RpdmVFbC5zZWxlY3Rpb25TdGFydCA9PSBcIm51bWJlclwiKSkge1xuICAgICAgICB0ZXh0ID0gYWN0aXZlRWwudmFsdWUuc2xpY2UoYWN0aXZlRWwuc2VsZWN0aW9uU3RhcnQsIGFjdGl2ZUVsLnNlbGVjdGlvbkVuZCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgdGV4dCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuICAgIH1cbiAgICBzZWxlY3RlZFRleHQgPSB0ZXh0O1xuICAgIHJldHVybiB0ZXh0O1xufVxuZG9jdW1lbnQub25tb3VzZXVwID0gZG9jdW1lbnQub25rZXl1cCA9IGRvY3VtZW50Lm9uc2VsZWN0aW9uY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgIGdldFNlbGVjdGVkVGV4dCgpO1xufTtcbmNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICBmcm9tOiBcImNvbnRlbnRcIixcbiAgICBzdWJqZWN0OiBcInNob3dQYWdlQWN0aW9uXCJcbn0pO1xuLy8gTGlzdGVuIGZvciBtZXNzYWdlcyBmcm9tIHRoZSBwb3B1cFxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChtc2csIHNlbmRlciwgcmVzcG9uc2UpIHtcbiAgICAvLyBGaXJzdCwgdmFsaWRhdGUgdGhlIG1lc3NhZ2UncyBzdHJ1Y3R1cmVcbiAgICBpZiAobXNnLmZyb20gPT09IFwicG9wdXBcIiAmJiBtc2cuc3ViamVjdCA9PT0gXCJET01JbmZvXCIpIHtcbiAgICAgICAgLy8gQ29sbGVjdCB0aGUgbmVjZXNzYXJ5IGRhdGFcbiAgICAgICAgdmFyIGRvbUluZm8gPSB7XG4gICAgICAgICAgICBzZWxlY3RlZFRleHQ6IHNlbGVjdGVkVGV4dFxuICAgICAgICB9O1xuICAgICAgICAvLyBEaXJlY3RseSByZXNwb25kIHRvIHRoZSBzZW5kZXIgKHBvcHVwKSxcbiAgICAgICAgLy8gdGhyb3VnaCB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrICovXG4gICAgICAgIHJlc3BvbnNlKGRvbUluZm8pO1xuICAgIH1cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==