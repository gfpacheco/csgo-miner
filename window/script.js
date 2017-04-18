$(function() {
  function createWebview(src, contentScripts) {
    var webview = document.createElement('webview');

    if (contentScripts) {
      webview.addContentScripts(contentScripts);
    }

    webview.src = src;
    document.body.appendChild(webview);
    return webview;
  }

  chrome.runtime.onMessage.addListener(function(request) {
    if (request.earning) {
      chrome.notifications.create('earning', {
        type: 'basic',
        iconUrl: '/icons/icon_128.png',
        title: 'Congratulations!',
        message: 'You just got a ' + request.earning
      }, function(notificationId) {});
    }
  });

  createWebview('https://www.drakemoon.com/moon-wars', [
    {
      name: 'moon-wars',
      matches: ['https://www.drakemoon.com/moon-wars'],
      js: { files: ['/window/vendor/jquery.js', '/window/scripts/drakemoon/moon-wars.js'] }
    },
    {
      name: 'moon-wars-top-100',
      matches: ['https://www.drakemoon.com/moon-wars-top-100'],
      js: { files: ['/window/scripts/drakemoon/moon-wars-top-100.js'] }
    }
  ]);

  createWebview('http://dealskins.com/case/cash');
});
