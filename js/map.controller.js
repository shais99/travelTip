import {mapService} from './map.service.js';

// This is our controller it is responsible for rendering the view and action upon events
// console.log(mapService);

window.addEventListener('load', onInit)

function onInit() {
    // mapService.getSearchLocation()

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

    var location = latLang;

    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 16, center: location });

    var marker = new google.maps.Marker({ position: location, map: map });
}


