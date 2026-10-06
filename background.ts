import { createMessageHandler } from './src/background-handler';

chrome.runtime.onMessage.addListener(createMessageHandler({
  runtimeId: chrome.runtime.id,
  activateTab: (id) => chrome.tabs.update(id, { active: true }),
}));
