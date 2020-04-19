
import { mapService } from './map.service.js';
import { Location } from './location-preview.js'
// This is our controller it is responsible for rendering the view and action upon events
// console.log(mapService);

window.addEventListener('load', onInit)

function onInit() {
    // mapService.getSearchLocation()

    mapService.getMyLocation()
        .then(pos => {
            var crd = pos.coords;
            renderMap({ lat: crd.latitude, lng: crd.longitude })
        })
    bindEvents()
}


function bindEvents() {
    // document.querySelector('header select').addEventListener('change', onSetLang);
    // document.querySelector('.filter-by-status').addEventListener('change', onSetFilter);
    // document.querySelector('.btn-add').addEventListener('click', onAddTodo);
}


function renderMap(latLang) {

    var location = latLang;

    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 16, center: location });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: location, map });

    map.addListener('click', (mapsMouseEvent) => {
        let clickedLat = mapsMouseEvent.latLng.toJSON().lat;
        let clickedLng = mapsMouseEvent.latLng.toJSON().lng;
        location = { lat: clickedLat, lng: clickedLng }
        marker = new google.maps.Marker({ position: location, map });
        let weather = 'soon weather...';
        let info = 'soon info...';
        let l1 = new Location(info, weather, location.lat, location.lng)
        console.log(l1);
        
        renderMap(location)
    })
}
