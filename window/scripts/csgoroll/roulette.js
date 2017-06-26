var openAt = Date.now();
var timesWithNo0 = 0;
var greed = 1;
var bet = 0;
var analytics = {};
var shouldTrack = false;

chrome.storage.local.get(function(data) {
  if (data && data.analytics) {
    analytics = data.analytics;
  }
});

function preventLogout() {
  window.location.reload();
}

function tryAgainLater() {
  setTimeout(loop, 2000);
}

function calculateBet() {
  if ($('csgr-round-list .round.green').length > 0) {
    shouldTrack = true;

    if (timesWithNo0 !== 0) {
      if (shouldTrack) {
        analytics[timesWithNo0] = (analytics[timesWithNo0] || 0) + 1;
        chrome.storage.local.set({analytics: analytics});
      }

      if (bet !== 0) {
        chrome.runtime.sendMessage({
          title: 'Congratulations!',
          message: 'You just won $' + (14 * bet) + ' and the current balance is $' + balance + ' on CSGORoll'
        });
        bet = 0;
      }
    }

    timesWithNo0 = 0;
  } else {
    timesWithNo0 += 1;
  }

  if (timesWithNo0 >= 10 && timesWithNo0 < 35) {
    bet = greed * Math.floor(timesWithNo0 / 10) / 100;
  } else {
    bet = 0;
  }
}

function doBet() {
  $('[formcontrolname="bet"]').val(bet)[0].dispatchEvent(new Event('change'));
  $('.btn-3d-success').click();
}

function loop() {
  var balance = parseFloat($('.btn-balance').text().trim());

  if (Date.now() - openAt > 3600000 && timesWithNo0 === 0) {
    preventLogout();
  } else if ($('csgr-countdown .progress').width() < 1) {
    tryAgainLater();
  } else {
    calculateBet();

    if (bet > 0) {
      balance -= bet;
      doBet();
    }

    console.log('times: ' + timesWithNo0 + ', balance: ' + balance + ', bet: ' + bet);
    setTimeout(loop, 20000);
  }
}

setTimeout(loop, 5000);
