import ext from '../../utils/ext';

export default function sendMessage(message, data) {
  return new Promise(function (resolve, reject) {
    ext.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];

      if (message === "get-url" || message === "get-questions") {
        ext.tabs.sendMessage(activeTab.id, { action: message, data }, function (response) {
          resolve(response)
        });
      } else {
        ext.tabs.sendMessage(activeTab.id, { action: message, data });
      }
    });
  });
}
