$(function() {
  function createWebview(src) {
    var webview = document.createElement('webview');
    webview.src = src;
    document.body.appendChild(webview);
    return webview;
  }

  var drakemoonWebview = createWebview('https://www.drakemoon.com/moon-wars');
  var dealskinsWebview = createWebview('http://dealskins.com/case/cash');
});
