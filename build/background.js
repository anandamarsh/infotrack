// set the listener for the alarm.
chrome.alarms.onAlarm.addListener(() => {
  updateBadge();
});

const random = (min,max) =>
  Math.floor(Math.random()*(max-min+1)+min)

// obtain the search results and set the next alarm
const updateBadge = () => {
  chrome.storage.sync.get(['keyword', 'url'], async ({keyword, url})=>{
    const res = await fetch(`https://infotrack-server.herokuapp.com/search?keyword=${keyword}&url=${url}`);
    const resJson = await res.json();
    console.log(`received res : [${resJson.join(', ')}]`);
    const noOfRefs = resJson.length;
    chrome.browserAction.setBadgeBackgroundColor({color: noOfRefs <=1 ? "red" : (noOfRefs <=3 ? "orange" : "green")});
    chrome.browserAction.setBadgeText({text: `${noOfRefs}`});
    // the alarm can fire anytime between 10 and 60 mins. doing this to inject randomness so that google doesnt think its a bot
    chrome.alarms.create('', { delayInMinutes: random(10,30) });
  });
}

// kickstart upon installing
chrome.runtime.onInstalled.addListener(() => {
  // see the storage wth defaults. we will update it if the user changes the settings from the content page
  chrome.storage.sync.set({keyword: 'online+title+search', url: 'https://www.infotrack.com.au'}, ()=>updateBadge());
});

// upon receiving new settings from the popup, update settings
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.storage.sync.set(request);
  chrome.alarms.create('', { delayInMinutes: 5 });
});