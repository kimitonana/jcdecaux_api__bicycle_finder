
$(document).ready(function() {

  var i;
  var mymap = L.map('mapid').setView([45.705, 4.85], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2ltaXRvbmFuYSIsImEiOiJjanZqOGcwZnYwY3o3NGJtbHpodDZlemN2In0.OVkYK94PG384_RB4_V7hiA', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoia2ltaXRvbmFuYSIsImEiOiJjanZqOGcwZnYwY3o3NGJtbHpodDZlemN2In0.OVkYK94PG384_RB4_V7hiA'
  }).addTo(mymap);

  L.marker([45.75, 4.85]).addTo(mymap)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

  // Use AJAX function to find all available bicyles in Lyon and my apiKey (created at JCDecaux website)
  // /!\ Old-fashioned way.
  // $.ajax('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=fddce93ac78059acfd05d7fa53fcf4d294be3722',
  // {
  //   dataType: 'json',
  //   async: true,
  //   method: 'GET',
  //
  //   success: function(data) {
  //     var points = data;
  //     for(i=0; i<points.length; i++) {
  //       // extract lat, lon plus some others value to print extra information for each marker
  //       lat = points[i]["position"]["lat"];
  //       lon = points[i]["position"]["lng"];
  //       name = points[i]["name"];
  //       addr = points[i]["address"];
  //       bikes = points[i]["available_bike_stands"]
  //
  //       // only display opened stations (no need to print information for closed ones).
  //       if(points[i]["status"] == "OPEN") {
  //         L.marker([lat, lon]).addTo(mymap)
  //           .bindPopup("Nom : " + name +
  //                     "<br>Addresse : " + addr +
  //                     "<br>Velo disponibles : " + bikes)
  //           .openPopup();
  //       }
  //
  //     }
  //   }

    // Use AJAX function to find all available bicyles in Lyon and my apiKey (created at JCDecaux website)
    // /!\ New-fashioned way.
    $.ajax({
        url: 'https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=fddce93ac78059acfd05d7fa53fcf4d294be3722',
        dataType: 'json',
        async: true,
        method: 'GET',

        success: function(data) {
          var points = data;
          points.forEach(function(point) {
            // only display opened stations (no need to print information for closed ones).
            if(point.status == "OPEN") {
              L.marker([point.position.lat, point.position.lng]).addTo(mymap)
                .bindPopup("Nom : " + point.name +
                          "<br>Adresse : " + point.address +
                          "<br>Velos disponibles : " + point.available_bike_stands)
                .openPopup();
            }
          })
        }
    })
});
