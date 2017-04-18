$(function() {
  function createWebview(src, contentScripts) {
    var webview = document.createElement('webview');
    webview.addContentScripts(contentScripts);
    webview.src = src;
    document.body.appendChild(webview);
    return webview;
  }

  chrome.runtime.onMessage.addListener(function(request) {
    if (request.title && request.message) {
      chrome.notifications.create('earning', {
        type: 'basic',
        iconUrl: '/icons/icon_128.png',
        title: request.title,
        message: request.message
      }, function(notificationId) {});
    }
  });

  createWebview('https://www.drakemoon.com/moon-wars', [
    {
      name: 'index',
      matches: ['https://www.drakemoon.com/'],
      js: { files: ['/window/scripts/drakemoon/goto-moon-wars.js'] }
    },
    {
      name: 'moon-wars',
      matches: ['https://www.drakemoon.com/moon-wars'],
      js: { files: ['/window/vendor/jquery.js', '/window/scripts/drakemoon/moon-wars.js'] }
    },
    {
      name: 'moon-wars-top-100',
      matches: ['https://www.drakemoon.com/moon-wars-top-100'],
      js: { files: ['/window/scripts/drakemoon/goto-moon-wars.js'] }
    }
  ]);

  createWebview('http://dealskins.com/case/cash', [
    {
      name: 'cash',
      matches: ['http://dealskins.com/*'],
      js: { files: ['/window/vendor/jquery.js', '/window/scripts/dealskins/cash.js'] }
    }
  ]);
});
