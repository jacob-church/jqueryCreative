var map, heatmap, infoWindow, service;

	function initMap() {
	var city = new google.maps.LatLng(40.2338, -111.6585);

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: city,
          mapTypeId: 'satellite'
        });

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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

            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

	infowindow = new google.maps.InfoWindow();
	service = new google.maps.places.PlaceService(map);

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
	  if (status == google.maps.place.PlacesServiceStuats.OK) {
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