var openAt = Date.now();

function randomSeconds(from, to) {
  return (from + (Math.random() * (to - from))) * 1000;
}

function preventLogout() {
  window.location.reload();
}

function claimDiamonds(claimButton) {
  claimButton.click();
  setTimeout(loop, randomSeconds(1, 2));
}

function tryAgainLater() {
  setTimeout(loop, randomSeconds(60, 120));
}

function login(loginButton) {
  loginButton[0].click();
}

function openChest(numDiamonds) {
  $('.chest').eq(getChestIndex(numDiamonds)).click();
  setTimeout(sellPrize, randomSeconds(9, 10));
}

function getChestIndex(numDiamonds) {
  if (numDiamonds > 5000) return 3;
  if (numDiamonds > 3000) return 2;
  if (numDiamonds > 1000) return 1;
  return 0;
}

function sellPrize() {
  var result = $('#chest-open-result .name-wrapper span').hide().show(0).eq(0).text();

  if (result.indexOf('Not your day') === -1 && result.indexOf('Chest') === -1) {
    chrome.runtime.sendMessage({
      title: 'Congratulations!',
      message: 'You just got a ' + result + ' on Drakemoon'
    });
  }

  $('.icon-arrow-circle-o-up').click();
  setTimeout(loop, randomSeconds(1, 2));
}

function loop() {
  var claimButton = $('.free-bar .icon-free_coins');
  var numDiamonds = parseInt($('.user-stats .diamonds span').text(), 10);
  var loginButton = $('.login-button');

  if (Date.now() - openAt > 3600000) {
    preventLogout();
  } else if (claimButton.length > 0) {
    claimDiamonds(claimButton);
  } else if (numDiamonds < 100) {
    tryAgainLater();
  } else if (loginButton.length > 0) {
    login(loginButton);
  } else {
    openChest(numDiamonds);
  }
}

loop();
