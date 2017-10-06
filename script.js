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
  $("#sideMenu").animate({ width: "200px" }, 500);
}//

// close side menu
function closeMenu() {
  $("#sideMenu").animate({ width: "0px" }, 500);
}//

$("#searchButton").click(function (e) {
  e.preventDefault();
  var input = $("#cityInput").val();
  console.log(input);
  var newCity;
  var myurl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  myurl += input;
  myurl += "&key=AIzaSyAxGH5zZbUiYeX8IalIM8Fqmk0J1Ptodpc"
  $.ajax({
    url: myurl,
    dataType: "json",
    success: function (parsed_json) {
      var lat = parsed_json.location.lat;
      var long = parsed_json.locaton.lng;
      console.log(lat);
      console.log(long);
      newCity = new google.maps.LatLng(lat, long);
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: newCity,
        mapTypeId: 'satellite'
      });
      applyHeatMap(lat, long);
    }
  })
});

function initMap() {
  var city = new google.maps.LatLng(40.2338, -111.6585);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: city,
    mapTypeId: 'satellite'
  });
};
