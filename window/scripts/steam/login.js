var openAt = Date.now();

function loop() {
  var button = document.getElementById('imageLogin');
  if (window.logon) {
    /* not logged in */
    chrome.runtime.sendMessage({
      title: 'Attention',
      message: 'You need to login into Steam first!'
    });
  } else if (button) {
    /* click button */
    button.click();
  } else {
    /* try again in 2 seconds */
    setTimeout(loop, 2000);
  }
}

loop();
