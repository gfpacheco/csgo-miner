var openAt = Date.now();
var timesWithNo0 = 0;
var greed = 1;
var bet = 0;
var analytics = {};

chrome.storage.local.get(function(data) {
  if (data && data.analytics) {
    analytics = data.analytics;
  }
});

function loop() {
  var balance = parseFloat($('.btn-balance').text().trim());

  if (Date.now() - openAt > 3600000 && timesWithNo0 === 0) {
    /* prevent logout */
    window.location.reload();
  } else if ($('csgr-countdown .progress').width() < 1) {
    /* is spinning */
    setTimeout(loop, 2000);
  } else {
    /* check if should bet */
    if ($('csgr-round-list .round.green').length > 0) {
      if (timesWithNo0 !== 0) {
        analytics[timesWithNo0] = (analytics[timesWithNo0] || 0) + 1;
        chrome.storage.local.set({analytics: analytics});

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
      bet = Math.min(greed * Math.floor(timesWithNo0 / 10) / 100, balance);
      if (bet > 0) {
        balance -= bet;
        $('[formcontrolname="bet"]').val(bet)[0].dispatchEvent(new Event('change'));
        $('.btn-3d-success').click();
      }
    } else {
      bet = 0;
    }

    console.log('times: ' + timesWithNo0 + ', balance: ' + balance + ', bet: ' + bet);
    setTimeout(loop, 20000);
  }
}

setTimeout(loop, 5000);
