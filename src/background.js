console.log("background", chrome);

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
  console.log("OFF");
});

return;
//Testingg >>>

chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  if (url !== "https://example.com/#inject-programmatic") return;
  const { options } = await chrome.storage.local.get("options");
  chrome.scripting.executeScript({
    target: { tabId },
    files: ["content-script.js"],
    ...options,
  });
});

chrome.runtime.onMessage.addListener(async ({ name, options }) => {
  if (name === "inject-programmatic") {
    await chrome.storage.local.set({ options });
    await chrome.tabs.create({
      url: "https://example.com/#inject-programmatic",
    });
  }
});

//Testingg >>>

async function closePrevReceiverTab() {
  const tabs = await chrome.tabs.query({
    url: chrome.runtime.getURL("ogame"),
  });

  console.log("tabs", tabs);

  await Promise.all(tabs.map((tab) => chrome.tabs.remove(tab.id)));
}

chrome.action.onClicked.addListener(async (tab) => {
  const currentTabId = tab.id;

  await closePrevReceiverTab();

  // Open a new tab with the receiver.html page
  const { tabs } = await chrome.windows.create({
    url: chrome.runtime.getURL("receiver.html"),
  });

  const receiverTabId = tabs[0].id;

  // Wait for the receiver tab to load
  await new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === receiverTabId && info.status === "complete") {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    });
  });

  // Send a message to the receiver tab
  chrome.tabs.sendMessage(receiverTabId, {
    targetTabId: currentTabId,
    consumerTabId: receiverTabId,
  });
});
