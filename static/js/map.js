var map = L.map('map').setView([-13.83, -40.95], 13);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}@2x.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy;<a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

var stations = new Stations(map);
stations.load(["ANA","Envisat"]);

$('#refresh-button').click(function() {
  var stationList = [];
  stations.removeLayer();

  $("[type=checkbox]:checked").each(function() {
    stationList.push($(this).val());
  });

  var startDate = convertToTimestamp($('#start_date').val());
  var endDate = convertToTimestamp($('#end_date').val());

  stations.load(stationList, startDate, endDate);
});

function convertToTimestamp(date) {
  var period = date.split("/");

  if (period[0] !== undefined && period[1] !== undefined && period[2] !== undefined) {
    return Date.parse(period[3] + "-" + period[2] + "-" + period[1] + " 00:00:00")/1000
  }

  return "";
}
