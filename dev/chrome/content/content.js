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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content/content.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content/content.js":
/*!********************************!*\
  !*** ./src/content/content.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_ext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/ext */ "./src/utils/ext.js");
/* harmony import */ var _utils_ext__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_ext__WEBPACK_IMPORTED_MODULE_0__);

var copyFields = null;

function onRequest(request, sender, sendResponse) {
  if (request.action === 'get-url') {
    sendResponse({
      info: window.location.href
    });
  } else if (request.action === 'get-questions') {
    var stringQuestions = document.head.getElementsByTagName('script');

    for (var key in stringQuestions) {
      var number = /[0-9]/;

      if (number.test(key)) {
        if (stringQuestions[key].text.includes("prepareCalculationsOnTheFly")) {
          var found = stringQuestions[key].text.split('prepareCalculationsOnTheFly([null,').map(function (el) {
            return el.split(']);');
          }).reduce(function (acc, curr) {
            return acc.concat(curr);
          })[1];
          var questions = JSON.parse('[' + found + ']');
          copyFields = questions;
          sendResponse({
            info: questions
          });
        }
      }
    }
  } else if (request.action === 'fill-form') {
    var fields = request.data.fields;
    var split;

    for (var _key in fields) {
      switch (fields[_key].name) {
        case 'control_fullname':
          split = fields[_key].value.split(" ");
          document.querySelector("#first_".concat(fields[_key].qid)).value = split[0];
          document.querySelector("#last_".concat(fields[_key].qid)).value = split[1];
          break;

        case 'control_email':
          document.querySelector("#input_".concat(fields[_key].qid)).value = fields[_key].value;
          break;

        case 'control_address':
          split = fields[_key].value.split(" ");
          document.querySelector("#input_".concat(fields[_key].qid, "_addr_line1")).value = split[0] + " " + split[1];
          document.querySelector("#input_".concat(fields[_key].qid, "_addr_line2")).value = split[2];
          document.querySelector("#input_".concat(fields[_key].qid, "_city")).value = "Manhattan";
          document.querySelector("#input_".concat(fields[_key].qid, "_state")).value = "New York";
          document.querySelector("#input_".concat(fields[_key].qid, "_postal")).value = "10026";
          break;

        case 'control_phone':
          split = fields[_key].value.split(" ");
          document.querySelector("#input_".concat(fields[_key].qid, "_area")).value = split[0];
          document.querySelector("#input_".concat(fields[_key].qid, "_phone")).value = split[1] + " " + split[2];
          break;

        case 'control_datetime':
          document.querySelector("#lite_mode_".concat(fields[_key].qid)).value = fields[_key].value;
          break;

        case 'control_time':
          var hour = ["00", "10", "20", "30", "40", "50"];
          document.querySelector("#input_".concat(fields[_key].qid, "_hourSelect")).value = Math.round(1 + Math.random() * (12 - 1));
          document.querySelector("#input_".concat(fields[_key].qid, "_minuteSelect")).value = parseInt(hour[Math.round(Math.random() * hour.length)], 10);
          document.querySelector("#input_".concat(fields[_key].qid, "_ampm")).value = "PM";
          break;

        case 'control_textbox':
          document.querySelector("#input_".concat(fields[_key].qid)).value = fields[_key].value;
          break;

        case 'control_textarea':
          document.querySelector("#input_".concat(fields[_key].qid)).value = fields[_key].value;
          break;

        case 'control_number':
          document.querySelector("#input_".concat(fields[_key].qid)).value = fields[_key].value;
          break;

        case 'control_dropdown':
          var realOptions = [];
          var options = document.querySelector("#input_".concat(fields[_key].qid));

          for (var i = 0; i < options.length; i++) {
            if (options[i].value !== "") {
              realOptions.push(options[i].value);
            }
          }

          console.log(options);
          var selectedOption = realOptions[Math.floor(Math.random() * realOptions.length)];
          console.log(selectedOption);
          document.querySelector("#input_".concat(fields[_key].qid)).value = selectedOption;
          break;

        case 'control_radio':
          var radios = document.querySelectorAll("[id^=\"input_".concat(fields[_key].qid, "\"]"));
          var selectedRadio = [Math.floor(Math.random() * radios.length)];
          document.querySelector("#input_".concat(fields[_key].qid, "_").concat(selectedRadio)).checked = true;
          break;

        case 'control_checkbox':
          var checkboxes = document.querySelectorAll("[id^=\"input_".concat(fields[_key].qid, "\"]"));

          for (var _i = 0; _i < checkboxes.length; _i++) {
            if (checkboxes[_i].value !== "") {
              document.querySelector("#input_".concat(fields[_key].qid, "_").concat(_i)).checked = false;
            }
          }

          var selectedCheckbox = [Math.floor(Math.random() * radios.length)];
          document.querySelector("#input_".concat(fields[_key].qid, "_").concat(selectedCheckbox)).checked = true;
          break;

        default:
          break;
      }
    }
  }
}

_utils_ext__WEBPACK_IMPORTED_MODULE_0___default.a.runtime.onMessage.addListener(onRequest);

/***/ }),

/***/ "./src/utils/ext.js":
/*!**************************!*\
  !*** ./src/utils/ext.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* global browser, window, chrome */
var apis = ['alarms', 'bookmarks', 'browserAction', 'commands', 'contextMenus', 'cookies', 'downloads', 'events', 'extension', 'extensionTypes', 'history', 'i18n', 'idle', 'notifications', 'pageAction', 'runtime', 'storage', 'tabs', 'webNavigation', 'webRequest', 'windows'];

function Extension() {
  var self = this;
  apis.forEach(function (api) {
    self[api] = null;

    try {
      if (chrome[api]) {
        self[api] = chrome[api];
      }
    } catch (e) {
      return;
    }

    try {
      if (window[api]) {
        self[api] = window[api];
      }
    } catch (e) {
      return;
    }

    try {
      if (browser[api]) {
        self[api] = browser[api];
      }
    } catch (e) {
      return;
    }

    try {
      self.api = browser.extension[api];
    } catch (e) {// I want application to not crush, but don't care about the message
    }
  });

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime;
    }
  } catch (e) {
    return;
  }

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction;
    }
  } catch (e) {// I want application to not crush, but don't care about the message
  }
}

module.exports = new Extension();

/***/ })

/******/ });
//# sourceMappingURL=content.js.map