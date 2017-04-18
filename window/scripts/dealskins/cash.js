var openAt = Date.now();

function loop() {
  if (Date.now() - openAt > 60000) {
    /* button not showing after 1 min */
    window.location = 'http://dealskins.com/case/cash';
    window.location.reload();
  } else if ($('[ng-switch-when="auth"]').length > 0) {
    $('[ng-switch-when="auth"]')[0].click();
  } else if ($('.container').length > 0) {
    $('.container').eq(1).find('.case').eq(1)[0].click();
    setTimeout(loop, (2 + Math.random()) * 1000);
  } else if ($('#btnOpen').length > 0) {
    /* open case */
    $('#btnOpen')[0].click();
    setTimeout(function() {
      var result = $('.win .title').text();

      if (result) {
        chrome.runtime.sendMessage({
          title: 'Congratulations!',
          message: 'You just got a ' + result
        });
      }

      setTimeout(loop, ((result ? 13 : 1) + Math.random()) * 300000);
    }, (10 + Math.random()) * 2000);
  } else {
    /* case not loaded */
    setTimeout(loop, (5 + Math.random()) * 1000);
  }
}

loop();
