"use strict";

window.onload = function(){
    /*-----------------------------------
    First map
    -----------------------------------*/

    // We create a leaflet map, and in setView, we determine coordinates and zoom level
    let map1 = L.map('map1').setView([45.50884, -73.58781], 10);

    // Add a tile layer using a URL ({z} is for zoom level, {x} for x coordinate, and {y} for y coordinate)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // you cannot zoom in more than 19, if set to 20, the map turns gray
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank_">OpenStreetMap</a>' // link to where we got the data for the map
    }).addTo(map1); // add tile layer to map


    // how to create a marker
    let myMarker = L.marker([45.49574898238983, -73.57738649827279]).addTo(map1); // set the coordinates of the marker and add it to the map

    // how to create a circle (around the Mont-Royal)
    let myCircle = L.circle([45.504659, -73.596689], { // the coordinates here are for the center of the circle
        color: '#ff0000', // choose the color of the outline of the circle
        weight: 8, // change the thickness of the outline
        fillColor: '#f03', // the color of the fill of the circle
        fillOpacity: 0.2, // the opacity of the fill
        radius: 1200, // the radius of the circle, how big it is
    }).addTo(map1); // add the circle to the map


    // how to add a polygon (around Laval)
    let myPolygon = L.polygon([
        // the coordinates of all the points of the polygon
        [45.697805, -73.529362],
        [45.679136, -73.726443],
        [45.526144, -73.885312],
        [45.512581, -73.767500]
    ],{
        // Just like the circle, we can modify some aspects of the polygon
        color: '#ffff00',
        weight: 1,
        fillColor: '#ffff00',
        fillOpacity: 0.2,
    }).addTo(map1); // add the polygon to the map



    // let's add a popup to the marker
    myMarker.bindPopup("<b>1515 Saint-Catherine St W, Montreal, QC H3G 2W1, Canada</b><br>CART 351").openPopup();

    // popups can be created for any shape on your map, let's add one on the polygon:
    myPolygon.bindPopup("<b>Laval</b>").openPopup();

    // let's add one to the circle too
    myCircle.bindPopup("<b>Mont-Royal</b>").openPopup();





    /*-----------------------------------
    New map, event listeners
    -----------------------------------*/

    // same thing as above but in Sydney, Australia
    let map2 = L.map('map2', {
        doubleClickZoom: false // this is just so when I double click on the map it doesn't zoom in
    }).setView([-33.904084, 150.874148], 9);

    // Add a tile layer using a URL ({z} is for zoom level, {x} for x coordinate, and {y} for y coordinate)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // you cannot zoom in more than 19, if set to 20, the map turns gray
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank_">OpenStreetMap</a>' // link to where we got the data for the map
    }).addTo(map2); // add tile layer to map


    // when clicking on the map, we want a popup with the coordinates to show up
    let coordinatePopup = L.popup(); // the popup

    function onMapClick(e) {
        // console.log("You clicked the map at " + e.latlng);

        coordinatePopup
        .setLatLng(e.latlng) // set the coordinates of the popup to the coordinates of the mouse when it was clicked
        .setContent("You clicked the map at " + e.latlng.toString()) // show the coordinates in the popup
        .openOn(map2); // open the popup on the map
    }
    map2.on('click', onMapClick); // when the map is clicked, go through the onMapClick function


    /*
    create a marker at the mouse's coordinates when double clicking on the map
    */

    // Let's add a marker when we double click on the map (very similar to the popup we did above)
    let coordinateMarker = L.marker();

    function onMapDblClick(e){
        // console.log("You double clicked the map at " + e.latlng);

        coordinateMarker // take the marker we have created earlier
        .setLatLng(e.latlng) // set the coordinates of the marker to the coordinates of the mouse when it was double clicked
        .addTo(map2); // add the marker to the map
    }
    map2.on('dblclick', onMapDblClick); // when the map is double clicked, go through the onMapDblClick function




    /*-----------------------------------
    New map, 
    -----------------------------------*/

    // same thing as above but showing the whole world
    let map3 = L.map('map3').fitWorld();

    // Add a tile layer using a URL ({z} is for zoom level, {x} for x coordinate, and {y} for y coordinate)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // you cannot zoom in more than 19, if set to 20, the map turns gray
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="blank_">OpenStreetMap</a>' // link to where we got the data for the map
    }).addTo(map3); // add tile layer to map


    // a button to activate the geolocation only when needed and not right when the page is opened
    let btn = document.getElementById('button'); // get my button from the html
    btn.addEventListener("click", startGeolocation); // when it's clicked, do the function startGeolocation
    // startGeolocation function
    function startGeolocation(){

        map3.locate({setView: true, maxZoom: 16}); // we locate the user and zoom in to their location
    
    }


    // what happens when we find the location
    function onLocationFound(e) {
        let radius = e.accuracy; // get the detection accuracy: the distance within the user's device should be
    
        L.circle(e.latlng, radius).addTo(map3); // create a circle with the coordinates found as it's center and the accuracy as the radius
    }
    
    map3.on('locationfound', onLocationFound); // when location is found, go through the onLocationFound function


    // what happens when the location isn't found
    function onLocationError(e) {
        console.log(e.message); // console log the error
        alert("We couldn't find your location..."); // display an alert
    }
    
    map3.on('locationerror', onLocationError); // when location isn't found, go through the onLocationError function
}