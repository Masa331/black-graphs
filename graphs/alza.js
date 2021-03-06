
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

  ary = alzaData;

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

  $("#detailPicture").append('<div id="pricesChart" style="position:relative;width:1024px;margin-top:160px;"></div>');
  plot("pricesChart", dates, originalPrices, currentPrices);
}, function (err) {
  console.log("Something bad happened during data retrieving from Elastic");
  console.log(err.message);
});
