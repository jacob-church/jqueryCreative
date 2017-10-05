var map, heatmap, infoWindow, service;

$('#about').html('');

function aboutUs() {
  if ($("#about").html() === "") {
    $("#about").html(
      "Enter your city to find out how pizzerific your location is! Are you pizza-impoverished? Or are you swimming in good pies?"
    ).hide().fadeIn("slow");
  }
  else {
    $("#about").html("");
  }
}

$("#about").click(aboutUs);

function changeMap() {
  var input = document.getElementById('pac-input');
}


// open side menu
function openMenu() {
    $("#sideMenu").animate({width: "200px"},500);
}//

// close side menu
function closeMenu() {
    $("#sideMenu").animate({width: "0px"},500);
}//


function initMap() {
var city = new google.maps.LatLng(40.2338, -111.6585);
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: city,
        mapTypeId: 'satellite'
      });

      heatmap = new google.maps.visualization.HeatmapLayer({
          data: [],
          map: map
      });

      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);

      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
}

function applyHeatMap(lat,lon) {
  // lat:
  // lon:
  var pizzaUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  pizzaUrl += "location" + lat + "," + lon;
  pizzaUrl += "&radius=5000&types=food&name=pizza"
  pizzaUrl += "&key=" + apiKey;
  $.ajax(
    url: pizzaUrl,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      data = data.results;
      var pizzaPlaces = [];
      for (var i = 0; i < data.length; i++) {
        var place = data[i].geometry.location;
        pizzaPlaces.push(new google.maps.LatLng(place.lat,place.lng));
      }
      heatMap.setData(pizzaPlaces);
    }
  );
}
