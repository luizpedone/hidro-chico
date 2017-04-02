function Stations(map) {
  var layer = {};
  var self = this;

  this.removeLayer = function(origin) {
    map.removeLayer(this.layer);
  }

  this.getActiveLayer = function(origin) {
    return this.layer;
  }

  this.load = function(origin, stardDate, endDate){
    $.ajax({
      dataType: "json",
      url: buildUrl(origin, stardDate, endDate),
      success: function(data) {
          self.layer = L.geoJSON(data, {
            onEachFeature: setPopup,
            pointToLayer: setStationStyle
          }).addTo(map);

          map.fitBounds(self.layer.getBounds());
      }
    }).done(function() {
      self.layer.bringToFront();
    });
  }

  function setPopup(feature, layer) {
    layer.bindPopup(
      "Altitude: " + feature.properties.altitude + "m<br>" +
      "Tipo de Estação: " + feature.properties.origin
    );
  }

  function buildUrl(origin, start_date, end_date) {
    var params = {};
    if (origin !== undefined) {
      params.stations = origin.toString();
    }
    if (start_date !== '') {
      params.start_date = start_date;
    }
    if (end_date !== '') {
      params.end_date = end_date;
    }
    return '/api/stations?' + $.param(params);
  }

  function setStationStyle(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 8,
      fillColor: feature.properties.origin === "ANA" ? "#990000" : "#FFCC00",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7
    });
  }

  function setLayer(layer){
    this.layer = layer;
  }
}
