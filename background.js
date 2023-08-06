// import "./src/content";
// import robot from "robotjs";
// console.log("robot", robot);

function selectTab() {
  chrome.tabs.query({}, function (tabs) {
    console.log("tabs", tabs);
    let found = false;
    let tabId;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url.search("ogame") > -1) {
        found = true;
        tabId = tabs[i].id;
      }
    }
    if (found == false) {
      chrome.tabs.executeScript(
        null
        // { file: "buy.js" }
      );
    } else {
      chrome.tabs.update(tabId, { selected: true });
    }
  });
}

function tabClear() {
  chrome.tabs.query({}, function (tabs) {
    console.log("tabs", tabs);
    let found = false;
    let tabIds = [];
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url.search("ogame") > -1 && tabs[i].url.search("game") > -1) {
        found = true;
        tabIds.push(tabs[i].id);
      }
    }
    if (found && tabIds.length > 1) {
      for (let index = 0; index < tabIds.length; index++) {
        if (index !== 1) {
          // chrome.tabs.remove(tabIds[index], function () {});
        }
      }
    }
  });
}

function setTabOgame() {
  chrome.tabs.query({}, function (tabs) {
    console.log("tabs", tabs);
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url.includes("ogame") && tabs[i].url.includes("game")) {
        chrome.tabs.update(tabs[i].id, { selected: true });
        break;
      }
    }
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.url.includes("ogame")) {
    console.log("onMessage", { request, sender, sendResponse });
    if (request.type === "attackShipInput") {
      setTabOgame();
    } else if (request.type === "tabClear") {
      tabClear();
    }
    sendResponse("OK");
  } else {
    sendResponse("REJECT");
  }
});

// self.addEventListener("message", (event) => {
//   if (event.data.type === "triggerFunction") {
// console.log("Function triggered with payload:", payload);
//   } else if (event.data.type === "attackShipInput") {
//   }
// });

//Testingg >>>

// chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
//   if (url !== "https://example.com/#inject-programmatic") return;
//   const { options } = await chrome.storage.local.get("options");
//   chrome.scripting.executeScript({
//     target: { tabId },
//     files: ["content-script.js"],
//     ...options,
//   });
// });

// chrome.runtime.onMessage.addListener(async ({ name, options }) => {
//   if (name === "inject-programmatic") {
//     await chrome.storage.local.set({ options });
//     await chrome.tabs.create({
//       url: "https://example.com/#inject-programmatic",
//     });
//   }
// });

//Testingg >>>

// async function closePrevReceiverTab() {
//   const tabs = await chrome.tabs.query({
//     url: chrome.runtime.getURL("ogame"),
//   });

//   console.log("tabs", tabs);

//   await Promise.all(tabs.map((tab) => chrome.tabs.remove(tab.id)));
// }

// chrome.action.onClicked.addListener(async (tab) => {
//   const currentTabId = tab.id;

//   await closePrevReceiverTab();

//   // Open a new tab with the receiver.html page
//   const { tabs } = await chrome.windows.create({
//     url: chrome.runtime.getURL("receiver.html"),
//   });

//   const receiverTabId = tabs[0].id;

//   // Wait for the receiver tab to load
//   await new Promise((resolve) => {
//     chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
//       if (tabId === receiverTabId && info.status === "complete") {
//         chrome.tabs.onUpdated.removeListener(listener);
//         resolve();
//       }
//     });
//   });

//   // Send a message to the receiver tab
//   chrome.tabs.sendMessage(receiverTabId, {
//     targetTabId: currentTabId,
//     consumerTabId: receiverTabId,
//   });
// });
