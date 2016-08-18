L.AjaxGeoJSON = L.GeoJSON.extend({
    options : {
      	pointToLayer: function (feature, latlng) {
      		//console.log("JES feature-->" , feature);
          		var layer = feature.properties.layer;
          		var icons = {
          			'school':'http://jesidea.com/cercepois/wp-content/uploads/2016/08/college-graduation.png',
          			'public_transpo':'http://jesidea.com/cercepois/wp-content/uploads/2016/08/frontal-bus-silhouette.png'
          		};

          		//console.log("JES icons[layer]-->" , icons[layer]);
              var smallIcon = new L.Icon({
              			iconSize: [16, 16],
              			iconAnchor: [16, 16],
              			popupAnchor:  [1, -24],
              			iconUrl: icons[layer]
              });
            	return L.marker(latlng, {icon: smallIcon});
          	},
          onEachFeature: function (feature, layer) {
              // does this feature have a property named popupContent?
              if (feature.properties && feature.properties.popupContent) {
                  layer.bindPopup(feature.properties.popupContent);
              }
          }
    },

    initialize : function (url, options) {
        L.setOptions(this, options);
        this._url = url;
        this.layer = L.geoJson(null, this.options);
    },

    onAdd : function (map) {
        var _this = this,
            xhr;

        this.map = map;

        map.addLayer( this.layer );

        if (!this.request) {
            this.request = xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                var data;
                if (xhr.readyState === xhr.DONE &&
                    xhr.status === 200) {
                    data = JSON.parse( xhr.responseText );
                    _this.json = data;
                    _this.layer.addData( data );
                    _this.fire('ready');
                }
            };

            xhr.open('get', this._url, true);

            xhr.send();
        }
        this.fire('add');
    },

    eachLayer : function (fnc) {
        this.layer.eachLayer( fnc );
    },

    setStyle : function (style) {

        this.layer.setStyle( style );
    },

    resetStyle : function (layer) {
        this.layer.resetStyle( layer );
    },

    onRemove : function (map) {
        this.map.removeLayer( this.layer );
    }
});

L.ajaxGeoJson = function( url, options ) {
    return new L.AjaxGeoJSON( url, options );
};
