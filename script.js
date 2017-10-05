var map, heatmap, infoWindow, service;

function initMap() {
  var city = new google.maps.LatLng(40.2338, -111.6585);

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: city,
    mapTypeId: 'satellite'
  });

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);

  var request = {
    location: city,
    radius: '1000',
    query: 'pizza'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
}

function callback(results, status) {
  if (status == google.maps.place.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

// Heatmap data: 500 Points
function getPoints() {
  return [

  ];
}
