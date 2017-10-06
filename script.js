var map, heatmap;
const apiKey = "AIzaSyAxGH5zZbUiYeX8IalIM8Fqmk0J1Ptodpc";


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

function changeMap() {
  var input = document.getElementById('pac-input');
}

// open side menu
function openMenu() {
  $("#sideMenu").animate({ width: "200px" }, 500);
}//

// close side menu
function closeMenu() {
  $("#sideMenu").animate({ width: "0px" }, 500);
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
}

function applyHeatMap(lat, lon) {
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: new google.maps.LatLng(lat,lon),
    radius: 50000,
    type: 'restaurant',
    name: 'pizza'
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      var pizzaPlaces = [];
      for (var i = 0; i < results.length; i++) {
        var place = data[i].geometry.location;
        pizzaPlaces.push(new google.maps.LatLng(place.lat(),place.lng()));
      }
      heatMap.setData(pizzaPlaces);
    }
  });
};

$(document).ready( function () {
  $("#about").html("");
  $("#about").click(aboutUs);
  $("#searchButton").click( function (e) {
    e.preventDefault();
    var input = $("#cityInput").val();
    console.log(input);
    var newCity;
    var myurl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    myurl += input;
    myurl += "&key=" + apiKey;
    $.ajax({
      url: myurl,
      dataType: "json",
      success: function (parsed_json) {
        console.log(parsed_json);
        var lat = parsed_json.results[0].geometry.location.lat;
        var long = parsed_json.results[0].geometry.location.lng;
        newCity = new google.maps.LatLng(lat, long);
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: newCity,
          mapTypeId: 'satellite'
        });
        applyHeatMap(lat, long);
      }
    });
  });
});
