!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=18)}({1:function(e,r){var t=["alarms","bookmarks","browserAction","commands","contextMenus","cookies","downloads","events","extension","extensionTypes","history","i18n","idle","notifications","pageAction","runtime","storage","tabs","webNavigation","webRequest","windows"];e.exports=new function(){var e=this;t.forEach(function(r){e[r]=null;try{chrome[r]&&(e[r]=chrome[r])}catch(e){return}try{window[r]&&(e[r]=window[r])}catch(e){return}try{browser[r]&&(e[r]=browser[r])}catch(e){return}try{e.api=browser.extension[r]}catch(e){}});try{browser&&browser.runtime&&(this.runtime=browser.runtime)}catch(e){return}try{browser&&browser.browserAction&&(this.browserAction=browser.browserAction)}catch(e){}}},18:function(e,r,t){"use strict";t.r(r);var n=t(1);t.n(n).a.runtime.onMessage.addListener(function(e){"change-color"===e.action&&(document.body.style.background=e.data.color)})}});