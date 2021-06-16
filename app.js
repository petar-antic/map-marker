function initMap(){
  var markers = [];
  
  var options = {
    center: {lat: 43.32472, lng: 21.90333 },
    zoom: 6
  }
  
  map = new google.maps.Map(document.getElementById("map"),options);
  
  google.maps.event.addListener(map, "click", (event) => {
    addMarker({location:event.latLng});
  })  
  
  var button = document.getElementById('btn-submit');
  button.addEventListener("click", function() { 
  var batchMarkers = document.getElementsByTagName('textarea')[0].value;
  var latLngPairs = batchMarkers.split('\n');
  latLngPairs.map(function(pair) {
    let latLngArray = pair.split(',');
    var latLng = ({location:{lat: Number(latLngArray[0]), lng: Number(latLngArray[1])}});
    addMarker(latLng);
  });
});

  function addMarker(property){
    let marker = new google.maps.Marker({
      position: property.location,
      map: map,
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
    });

    const colors = ['blue', 'green', 'yellow', 'pink', 'purple'];

    google.maps.event.addListener(marker,'click', function () {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        url = `http://maps.google.com/mapfiles/ms/icons/${randomColor}-dot.png`;
        marker.setIcon(url);
    });

    google.maps.event.addListener(marker, 'rightclick', function(event) {
      marker.setMap(null);
    });
  }
};