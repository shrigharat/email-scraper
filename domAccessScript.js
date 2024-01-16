chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'accessDom') {
      var pageDom = document.body.innerHTML;
    //   console.log(pageDom);
      chrome.runtime.sendMessage({ action: 'domAccessed', domContent: pageDom });
    }
});
  