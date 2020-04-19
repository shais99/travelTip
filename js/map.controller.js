
import { mapService } from './map.service.js';
import { Location } from './location-preview.js';
// This is our controller it is responsible for rendering the view and action upon events
// console.log(mapService);

window.addEventListener('load', onInit)

function onInit() {
    // mapService.getLocationBy('name')
    // .then (saveToSt)

    // checkUrlLocation();
    mapService.getMyLocation()
        .then(pos => {
            var crd = pos.coords;
            renderMap({ lat: crd.latitude, lng: crd.longitude })
        })
    renderSavedLocations()
    bindEvents()
}

function checkUrlLocation() {
    // if (getParameterByName('lat'))
}

function bindEvents() {
    // document.querySelector('header select').addEventListener('change', onSetLang);
    // document.querySelector('.filter-by-status').addEventListener('change', onSetFilter);
    // document.querySelector('.btn-add').addEventListener('click', onAddTodo);
    // document.querySelector('.delete-location').addEventListener('click', onDeleteLocation);
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

        mapService.setNewLocation(location)
        renderMap(location)
    })
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function renderSavedLocations() {
    if (!mapService.gLocations || !mapService.gLocations.length) {
        document.querySelector('.my-locations-container').innerHTML = `<h2>No Saved Locations!</h2>`;
    }
    mapService.gLocations.forEach(location => {
        let locationPreview = new Location(location.info, location.weather, location.lat, location.lng)
        const elLocation = locationPreview.render();
        
        document.querySelector('.my-locations-container').appendChild(elLocation);
    })
}