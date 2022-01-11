 
let map;


function haversine_distance(lat1,long1,lat2,long2) { 
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = lat1 * (Math.PI/180); // Convert degrees to radians
  var rlat2 =lat2 * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (long2-long1) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}


function initMap() {
  const markersArray = [
    
      {
        "Fosa":"PPS1",
        "lat":-4.3124453        ,
        "long":15.2723457
      },
      {
        "Fosa":"PPS2",
        "lat":-4.317219,
        "long":15.266352
      },
      {
        "Fosa":"PPS3",
        "lat":-4.3160849        ,
        "long":15.2717307
      },
      {
        "Fosa":"PPS4",
        "lat":-4.319267        ,
        "long":15.2708357
      },
      {
        "Fosa":"PPS5",
        "lat":-4.3216849        ,
        "long":15.2691664
      },
      {
        "Fosa":"PPS6",
        "lat":-4.3104607        ,
        "long":15.2722839
      },
      {
        "Fosa":"PPS7",
        "lat":-4.3133807        ,
        "long":15.2698562
      },
      {
        "Fosa":"PPS8",
        "lat":-4.3194175        ,
        "long":15.2719956
      },
      {
        "Fosa":"PPS9",
        "lat":-4.3264075        ,
        "long":15.2749543
      },
      {
        "Fosa":"PPS10",
        "lat":-4.3234572        ,
        "long":15.2864098
      },
      {
        "Fosa":"PPS11",
        "lat":-4.3174961,
        "long":15.2839822
      },
      {
        "Fosa":"PPS12",
        "lat":-4.3203274        ,
        "long":15.2921218
      },
      {
        "Fosa":"PPS13",
        "lat":-4.307346        ,
        "long":15.2834581
      },
      {
        "Fosa":"PPS14",
        "lat":-4.3064533,
        "long":15.2865837
      },
      {
        "Fosa":"PPS15",
        "lat":-4.3139626        ,
        "long":15.2744078
      }
    
  ];
  const mapOptions = {
    zoom: 15,
    center: { lat: -4.340292948026019, lng: 15.31363218749273 },
  };
   

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  markersArray.forEach((markerData) => {
    const marker = new google.maps.Marker({
      position: { lat: markerData.lat, lng: markerData.long },
      map: map,
      title: markerData.Fosa,
      // icon:"fo.png"
    });
      const infowindow = new google.maps.InfoWindow({
      content: "<div><p>"+markerData.Fosa+ "</p><hr><p>Latitude: "+markerData.lat+"</p><p>Longitude: "+markerData.long+"</p></div>",
      // content: "<p>Marker Location:" + marker.getPosition() +" AND "+ "</p>",
      });

    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker);
    });//end listener
  });//end foreach


var mylat,mylong;
const dist=[];
  if ( navigator.geolocation ) {
    console.log("Supporte google maps")
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log("Reussi ",position.coords.latitude,position.coords.longitude);
        mylat=position.coords.latitude;
        mylong=position.coords.longitude;
        const mymarker = new google.maps.Marker({
          position: { lat: position.coords.latitude, lng: position.coords.longitude },
          map: map,
          title: "Mcoordonnees",
          icon:"user.png"
        });
          const infowindow = new google.maps.InfoWindow({
          content: "<div><p>My coordonnée</p><hr><p>Latitude: "+ position.coords.latitude+"</p><p>Longitude: "+position.coords.longitude+"</p></div>",
          // content: "<p>Marker Location:" + marker.getPosition() +" AND "+ "</p>",
          });
    
        google.maps.event.addListener(mymarker, "click", () => {
          infowindow.open(map, mymarker);
        });//end listener
            markersArray.forEach((markerData) => {
      var res=haversine_distance(mylat,mylong,markerData.lat,markerData.long);
      console.log("Me and "+markerData.Fosa+" are "+res+" miles apart");
      dist.push({"distance":res,"Fosa":markerData});
     
    });

 var minlat;
 var minlong;
dist.forEach((dd)=>{
  if(dd.distance==Math.min(...dist.map(o => o.distance))){
    minlat=dd.Fosa.lat;
    minlong=dd.Fosa.long;
    console.log("The closest is "+dd.Fosa.Fosa+" at "+dd.distance+" miles");
  }
});

const dakota = {lat: mylat, lng: mylong};
const frick = {lat: minlat, lng: minlong};
// Draw a line showing the straight distance between the markers
var line = new google.maps.Polyline({path: [dakota, frick], map: map, });
    }, function(e){
      console.log("erreur ");
      alert(e)
  });
}





} //end initMap
