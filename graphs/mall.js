var waitForEl = function(selector, callback) {
  if (jQuery(selector).length) {
    callback();
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

var url = window.location.href;
var client = elasticsearch.Client({
  hosts: 'https://search-datafestival2018v2-jawz32ieac6ilsury3lmmotnzy.eu-central-1.es.amazonaws.com'
});

var pricesPerDate;
client.search({
  index: 'test',
  query: {
    match: {
      url: url
    }
  }
}).then(function (resp) {
  var pricesPerDate = resp.hits.hits.map(row => row['_source']);

  var ary = mallData;

  ary.sort(function(a, b) {
    aDate = Date.parse(a['date']);
    bDate = Date.parse(b['date']);

    if (aDate > bDate) {
      return 1;
    } else {
      return -1;
    }
  });

  dates = ary.map(row => dateFormat(new Date(row['date']), "yyyy-mm-dd"));
  currentPrices = ary.map(row => row['currentPrice']);
  originalPrices = ary.map(row => row['originalPrice']);

  waitForEl(".pro-wrapper", function() {
    $(".pro-wrapper").append('<section class="pro-column" style="height:450px;width:100%"><div id="pricesChart"></div></section>');
    plot("pricesChart", dates, originalPrices, currentPrices);
  })
}, function (err) {
  console.log("Something bad happened during data retrieving from Elastic");
  console.log(err.message);
});
