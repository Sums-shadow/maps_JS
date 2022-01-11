function initMap() {
   
   

  }
  
 

console.log("HELLLO")


   // initialize services
   var initCoords=function() {
    if ( navigator.geolocation ) {
        console.log("Supporte google maps")
        navigator.geolocation.getCurrentPosition((position)=>{
            console.log("Reussi ",position);
        }, showError);
    }
}

initCoords();
var showError=function(e){
    console.log("erreur ");
    alert(e)
};

var showPosition=function( position ) {
    console.log("Reussi "+position);
    var lat = position.coords.latitude;
    var long =  position.coords.longitude;
    var latlng=new google.maps.LatLng(lat,long);
    alert( latlng );

    /* add marker?? */
}