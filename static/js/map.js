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

  stations.load(stationList);
})
