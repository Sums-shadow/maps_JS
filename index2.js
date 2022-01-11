function initMap() {
    const bounds = new google.maps.LatLngBounds();
    const markersArray = [];
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 55.53, lng: 9.4 },
      zoom: 10,
    });
    // initialize services
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    // build request
    const origin1 = { lat: -4.340292948026019, lng: 15.31363218749273 };
    const origin2 = "3 E Rue, Kinshasa";
    const destinationA = "Manzengele, Kinshasa";
    const destinationB = { lat: -4.333103812620694, lng: 15.297152694758221 };
    const request = {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
  
    // put request on page
    document.getElementById("request").innerText = JSON.stringify(
      request,
      null,
      2
    );
    // get distance matrix response
    service.getDistanceMatrix(request).then((response) => {
      // put response
      document.getElementById("response").innerText = JSON.stringify(
        response,
        null,
        2
      );
  
      // show on map
      const originList = response.originAddresses;
      const destinationList = response.destinationAddresses;
  
      deleteMarkers(markersArray);
  
      const showGeocodedAddressOnMap = (asDestination) => {
        const handler = ({ results }) => {
          map.fitBounds(bounds.extend(results[0].geometry.location));
          markersArray.push(
            new google.maps.Marker({
              map,
              position: results[0].geometry.location,
              label: asDestination ? "D" : "O",
            })
          );
        };
        return handler;
      };
  
      for (let i = 0; i < originList.length; i++) {
        const results = response.rows[i].elements;
  
        geocoder
          .geocode({ address: originList[i] })
          .then(showGeocodedAddressOnMap(false));
  
        for (let j = 0; j < results.length; j++) {
          geocoder
            .geocode({ address: destinationList[j] })
            .then(showGeocodedAddressOnMap(true));
        }
      }
    });
  }
  
  function deleteMarkers(markersArray) {
    for (let i = 0; i < markersArray.length; i++) {
      markersArray[i].setMap(null);
    }
  
    markersArray = [];
  }










let  infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }