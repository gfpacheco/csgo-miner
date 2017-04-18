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
