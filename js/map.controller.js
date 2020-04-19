// import {mapService} from './map.service.js';

// This is our controller it is responsible for rendering the view and action upon events
// console.log(mapService);

window.addEventListener('load', onInit)

function onInit() {
    getMyLocation()
    bindEvents()
}

function bindEvents() {
    // document.querySelector('header select').addEventListener('change', onSetLang);
    // document.querySelector('.filter-by-status').addEventListener('change', onSetFilter);
    // document.querySelector('.btn-add').addEventListener('click', onAddTodo);
}

function getMyLocation() {
    navigator.geolocation.getCurrentPosition(setLocation, error);
}

function setLocation(pos) {
    var crd = pos.coords;
    renderMap({ lat: crd.latitude, lng: crd.longitude })
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function renderMap(latLang) {
    // The location of Uluru
    var location = latLang;
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 16, center: location });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: location, map: map });
}


