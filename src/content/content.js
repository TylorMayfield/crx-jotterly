// Content script for Jotterly

console.log('Jotterly content script loaded.');

// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'addNote',
    title: 'Add Note',
    contexts: ['selection', 'image'],
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'addNote') {
    let noteContent;
    if (info.selectionText) {
      noteContent = info.selectionText; // Selected text
    } else if (info.srcUrl) {
      noteContent = info.srcUrl; // Image URL
    }
    // Send message to the background script or open a popup to save the note
    console.log('Note content:', noteContent);
    // Here you can implement the logic to open the Jotterly app with the noteContent
  }
});

// This script can be expanded to interact with the web page if needed.
// For now, it simply logs a message to the console.