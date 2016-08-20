# Cerceloc

A number of projects to integrate POIs in Cercedilla


## Platforms
* LeafletJS
* wordpress
* OpenStreetMap OSM
* geojson.io

## Administración de POIs
* Usuario pueda hacer CRUD de POIs
* Posibilidad de geocodificar dichos POIs
* Exportación a geoJSON

## Mapping de servicios en site del ayuntamiento
* Localizador de servicio: integración de mapa de leaflet/openstreetmap en la página de los servicios del ayuntamiento
* Responsive mobile
---
**Solution**:
* Wordpress plugins : Pods , Geo Mashup , Leaflet map, Royal custom css
```
http://jesidea.com/cercepois/pagina-de-prueba-de-mostrar-el-geojson-de-una-layer-con-leaflet/
```

* **Leaflet map plugin** customized in  leaflet-map/scripts/leaflet-ajax-geojson.js
to render a map with geojson with data of cercepois

* **Pods** plugin customized in pods/geojson_ccp.php to retrieve GeoJSON of Cercepois by layer. For example retrieve schools:

```
http://jesidea.com/cercepois/wp-content/plugins/pods/geojson_ccp.php?layer=school
```
* Leaflet easybutton plugin to put locate button: Integrated in leaflet plugin

* Hacer **presentación web** de la propuesta: Proyecto de geolocalización de información de servicios:
  * Tener una base de datos en wordpress de todos los sitios de servicios publicos y de interes para los ciudadanos / visitantes de Cercedilla
  * Administración de esos sitios de forma que se puedan geolocalizar. Control completo de los puntos que se muestran
  * Integrar mapas en el site actual del ayuntamiento
  * Proveedor de mapas: Google / OSM. Ventajas de la filosofia open
  * Leaflet: explicar Ventajas
  * Localización de posición (móviles)
  * Routing a los puntos de interes seleccionados


## Cercemap
* Mapa a pantalla completa con capas de los servicios básicos
* Datos importados desde la Administración de POIs
* Integración infowindow con Streetviews
* Integrar driving directions
* Responsive mobile


## Cerceloc
* Mapa a pantalla completa de las rutas urbanas y senderos en las cercanías del pueblo
* Perfil de altimetria
* Datos importados desde la Administración de POIs
* Responsive mobile


## Cerce Story Mapa
* Storymap: según vas leyendo la historia se va cambiando la localización del mapa en correspondencia : leaflet plugin : http://atlefren.github.io/storymap/
