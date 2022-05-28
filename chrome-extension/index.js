function inject() {
  const clientId = document.getElementById('client-selector').value;
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    chrome.scripting.executeScript({
      args: [ clientId ],
      target: { tabId: tabs[0].id },
      func: (clientId) => {
        if (document.getElementById('botwerk-clientId')) {
          document.getElementById('botwerk-clientId').remove();
        }
        var cid = document.createElement('div');
        cid.setAttribute('id', 'botwerk-clientId');
        cid.textContent = clientId;
        cid.style.display = "none";
        document.body.appendChild(cid);

        var script = document.createElement('script');
        script.src = chrome.runtime.getURL("ws.js");
        (document.head || document.documentElement).appendChild(script);
      },
    });
  });
}

document.getElementById('inject').addEventListener('click', inject);
inject();