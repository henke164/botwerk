function inject() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        var script = document.createElement('script');
        script.src = chrome.runtime.getURL("ws.js");
        (document.head || document.documentElement).appendChild(script);
      },
    });
  });
}

document.getElementById('inject').addEventListener('click', inject);
inject();