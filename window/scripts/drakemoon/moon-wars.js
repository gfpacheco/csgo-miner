var openAt = Date.now();

function loop() {
  var claimButton = $('.free-bar .icon-free_coins');
  var numDiamonds = parseInt($('.user-stats .diamonds span').text(), 10);
  var loginButton = $('.login-button');

  if (Date.now() - openAt > 3600000) {
    /* prevent logout */
    window.location.reload();
  } else if (claimButton.length > 0) {
    /* claim diamonds */
    claimButton.click();
    setTimeout(loop, (1 + Math.random()) * 1000);
  } else if (numDiamonds < 100) {
    /* not enough diamonds */
    setTimeout(loop, (1 + Math.random()) * 60000);
  } else if (loginButton.length > 0) {
    /* login */
    loginButton[0].click();
  } else {
    /* open chest */
    var chestIndex = 0;
    if (numDiamonds > 1000) {
      chestIndex = 1;
    } else if (numDiamonds > 3000) {
      chestIndex = 2;
    } else if (numDiamonds > 5000) {
      chestIndex = 3;
    }
    $('.chest').eq(chestIndex).click();
    setTimeout(function() {
      /* sell prize */
      var result = $('#chest-open-result .name-wrapper span').hide().show(0).eq(0).text();

      if (result.indexOf('Not your day') === -1 && result.indexOf('Chest') === -1) {
        chrome.runtime.sendMessage({
          title: 'Congratulations!',
          message: 'You just got a ' + result + ' on Drakemoon'
        });
      }

      $('.icon-arrow-circle-o-up').click();
      setTimeout(loop, (1 + Math.random()) * 1000);
    }, (9 + Math.random()) * 1000);
  }
}

loop();
