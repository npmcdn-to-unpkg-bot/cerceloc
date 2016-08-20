/**
JesCityMap
Js framework to render leaflet maps of POI in cities

Requirements : jQuery , LeafletJS , lodash.js
*/

//IIF to have safe code (only exposes to global object certain properties)
;(function(global , $) {

	var JesCityMap = function(mapElementId , cityName , options){
  	return new JesCityMap.init(mapElementId , cityName , options);
  };

  //This variable is only accesible within this IIF
  var cityName = this.cityName | "Cercedilla";

  var center = [40.7410, -4.0574];  //Lat, lon

  var defaultOptions = {
    zoom:13,
  };

  // getting all the markers at once
  var getAllMarkers = function (map) {
      var markerArray = [];

      jQuery.each(map._layers, function (ml) {
          if (map._layers[ml].feature) {
            var coordinates = map._layers[ml].feature.geometry.coordinates;
            markerArray.push(L.marker([coordinates[1], coordinates[0]]));
          }
      });
      return markerArray;
  };

	JesCityMap.prototype = {

    //Render leaflet map inside mapElementId provided
  	render: function() {
      var self=this;
      var mymap = L.map(self.mapElementId ).setView(center, self.options.zoom);

      // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamVzY2FjZW5hIiwiYSI6ImNpcnc0aGY0aDAwaG1ocW0xNzgwYWZrOXcifQ.dowcr7bOEgJfRtWF4GCU2Q', {
      //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      //     maxZoom: 18,
      //     id: 'jescacena.14i0d24m',
      //     accessToken: 'pk.eyJ1IjoiamVzY2FjZW5hIiwiYSI6ImNpcnc0aGY0aDAwaG1ocW0xNzgwYWZrOXcifQ.dowcr7bOEgJfRtWF4GCU2Q'
      // }).addTo(mymap);

      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);

      if(self.options.geojsonLayerUrl) {
        var geojsonFeatureRemote;
        jQuery.ajax({
          url: self.options.geojsonLayerUrl,
          cache: false
        }).done(function( data ) {
            // console.log("Remote geojson data" , data);
            var layerOptions = {
              // pointToLayer: function (feature, latlng) {
              //   console.log("JES feature-->" , feature);
              //       var layer = feature.properties.layer;
              //
              //       var myIcon = L.divIcon({
              //           iconSize: new L.Point(70, 20),
              //           className: 'text-labels',
              //           html: feature.properties.name
              //       });
              //       // return L.marker(latlng, {icon:myIcon});
              //       return L.marker(latlng).bindLabel("JOJOJOJOJO");
              //     },
              onEachFeature: function (feature, layer) {
                  // console.log("onEachFeature feature" , feature);
                  console.log("onEachFeature layer" , layer);
                  layer.bindPopup(feature.properties.popupContent);
                  // layer.bindLabel("JOJOJOJOJO");
                  layer.on('mouseover', function (e) {
                      this.openPopup();
                  });
                  // layer.on('mouseout', function (e) {
                  //     this.closePopup();
                  // });
              }
            };
            L.geoJson(data.features , layerOptions).addTo(mymap);

            var allMarkers = getAllMarkers(mymap);
            var group = new L.featureGroup(allMarkers);

            // console.log("Remote geojson bounds" , group.getBounds());

            mymap.fitBounds(group.getBounds(), { padding: [20, 20] });
            // map.fitBounds(bounds, { padding: [20, 20] });
          });
      }

      //Locate icon
      L.easyButton({
        states:[
          {
            stateName: 'unloaded',
            icon: 'fa-location-arrow',
            title: 'load image',
            onClick: function(control){
              control.state("loading");
              control._map.on('locationfound', function(e){
                //this.setView(e.latlng, 17);
                control.state('loaded');

                //REnder radius around location
                var radius = e.accuracy / 2;

                var pinIcon = new L.Icon({
                      iconSize: [35, 35],
                      iconAnchor: [35, 35],
                      popupAnchor:  [1, -24],
                      iconUrl: 'Geo-fence-50.png'
                });

                L.marker(e.latlng,{icon: pinIcon}).addTo(mymap)
                    .bindPopup('Tu posición está en un radio de  ' + radius + ' meters desde este punto').openPopup();

                // L.circle(e.latlng, radius).addTo(mymap);
              });
              control._map.on('locationerror', function(){
                control.state('error');
              });
              control._map.locate()
            }
          }, {
            stateName: 'loading',
            icon: 'fa-spinner fa-spin'
          }, {
            stateName: 'loaded',
            icon: 'fa-thumbs-up'
          }, {
            stateName: 'error',
            icon: 'fa-frown-o',
            title: 'location not found'
          }
        ]
      }).addTo(mymap);

    }

  };

  JesCityMap.init = function(mapElementId , cityName , options){
    //Store this in self variable to be sure this is pointing to my object in any place
    var self = this;
    self.mapElementId = mapElementId;
    self.cityName = cityName || "Cercedilla";
    self.options = _.merge(options, defaultOptions);

    console.log("jescitymap options" , self.options);
  };

  JesCityMap.init.prototype = JesCityMap.prototype;

  //Expose your object to global to be used anywhere
  global.JesCityMap = JesCityMap;

  //console.log(global);

}(window , jQuery));

//console.log(window);

//What we would like, i don't want to say "new" all the time
// var a = G$("John" , "Doe");
//
// $("#login").on("click" , function() {
// 	var langSelected = $('#lang').val();
// 	a.greet().setLang(langSelected).greet(true).log().setGreeting("#greeting");
// });
