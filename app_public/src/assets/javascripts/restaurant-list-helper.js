var map, infoWindow;
var markers1 = [];

function handleAddress(address) {
  //console.log(address);

  // map = new google.maps.Map(document.getElementById('googleMap'), {
  //     center: {lat: -46.056946 , lng: 14.505751},
  //     zoom: 14
  // });

  var request = {
    query: address,
    fields: ['name', 'geometry'],
  };

  for (let marker of markers1) {
    marker.setMap(null);
  }

  for (let circle of circles) {
    circle.setMap(null);
  }

  for (let marker of markers) {
    marker.setMap(null);
  }

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    //console.log(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        markers1.push(createMarker(results[i]));
      }
      updateAnalytics();
      map.setCenter(results[0].geometry.location);
      document.getElementById("googleMap").focus();
    } else {
      //window.alert("Sorry, this location was not found.\nYou will be redirected to your current location.");
      initMap();
    }
  });
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

  return marker;
}

var ljubljana = {
  lat: 46.056946,
  lng: 14.505751
};


var source = "<div class=\"row-fill\"></div>\n" +
    "{{#each foundRestaurant as |restaurant| }}\n" +
    "    <div onclick=\"handleAddress('{{restaurant.formatted_address}}')\" class=\"restaurant\" tabindex=\"1\">\n" +
    "      <div class=\"row\">\n" +
    "         <div class=\"col-md-6 col-sm-12\">\n" +
    "            <h1>{{restaurant.name}}</h1>\n" +
    "            <p>{{restaurant.formatted_address}}</p>\n" +
    "            <p>Ocena: {{restaurant.rating}}</p>\n" +
    "          </div>" +
    "          <div class=\"col-md-1\"></div>\n" +
    "              <div class=\"col-md-5\">\n" +
    "                   <div class=\"row\">\n" +
    "                       <div class=\"col-md-1 col-sm-1 col-xs-1\">\n" +
    "                       </div>\n" +
    "                       <div class=\"col-md-4 col-sm-4 col-xs-4\"></div>\n" +
    "                           <div class=\"col-md-1 col-sm-1 col-xs-1\">\n" +
    // "                              <img class=\"rs-image-logo\" src=\"{{restaurant.icon}}\" alt=\"Placeholder\">" +
    "                           </div>\n" +
    "                       </div>\n" +
    "                       <div class=\"row rs-image-row\">\n" +
    "                           <div class=\"col-md-12 col-sm-12\">\n" +
    // "                               <img class=\"img-fluid rs-image\" src=\"{{restaurant.photo}}\" alt=\"Placeholder\">\n" +
    "                       </div>\n" +
    "                    </div>\n" +
    "            </div>" +
    "       </div>\n" +
    "     </div>\n" +
    "    <div class=\"row-fill\"></div>\n" +
    "{{/each}}";

var circles = [];
var markers = [];
var returnRestaurants = [];

function initMap() {
  console.log("IM HERE");
  document.getElementById("showHideFoundRestaurants").style.display = "none";

  map = new google.maps.Map(document.getElementById('googleMap'), {
    center: {lat: -46.056946, lng: 14.505751},
    zoom: 14
  });

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      // if user can not be located, set ljubljana as the map center
      map.zoom = 12;
      map.setCenter(ljubljana);
    });
  } else {
    // if user can not be located, set ljubljana as the map center
    map.zoom = 12;
    map.setCenter(ljubljana);
  }

  google.maps.event.addListener(map, "click", function (event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log(latitude + ', ' + longitude);

    for (let circle of circles) {
      circle.setMap(null);
    }

    for (let marker of markers) {
      marker.setMap(null);
    }

    for (let marker of markers1) {
      marker.setMap(null);
    }

    radius = new google.maps.Circle({
      map: map,
      radius: 300,
      center: event.latLng,
      fillColor: '#777',
      fillOpacity: 0.1,
      strokeColor: '#AA0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      draggable: false,    // Dragable
      editable: false      // Resizable
    });
    circles.push(radius);
    // Center of map
    var location = new google.maps.LatLng(latitude, longitude);
    map.panTo(location);
    map.setCenter(location);

    var request = {
      location: location,
      radius: 300,
      query: 'restaurants',
      fields: ['icon', 'photos', 'name', 'place_id', 'formatted_address'],
    };

    returnRestaurants = [];

    var service = new google.maps.places.PlacesService(map);
    service.textSearch(request, function (results, status) {
      //console.log(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var resultCount = 0;
        for (var i = 0; i < results.length; i++) {
          if (google.maps.geometry.spherical.computeDistanceBetween(results[i].geometry.location, location) < request.radius) {
            markers.push(createMarker(results[i]));
            if (results[i].photos !== undefined && results[i].photos.length > 0) {
              results[i].photo = results[i].photos[0].getUrl({'maxWidth': 1000}) + '.jpg';
            } else {
              results[i].photo = 'https://www.themezzaninegroup.com/wp-content/uploads/2017/12/photo-not-available.jpg'
            }
            returnRestaurants.push(results[i]);
            resultCount++;
          }
        }
        document.getElementById("showHideRestaurants").style.display = "none";
        // let template = hbs.compile(source);
        // document.getElementById("showHideFoundRestaurants").innerHTML = template({foundRestaurants: returnRestaurants});
        sendRestaurantDataToNode(returnRestaurants, source);

        document.getElementById("showHideFoundRestaurants").style.display = "";
        map.setCenter(event.latLng);
        //console.log(returnRestaurants);
      } else {
        window.alert("Sorry, this location was not found.\nYou will be redirected to your current location.");
        initMap();
      }
    });

  });
}





