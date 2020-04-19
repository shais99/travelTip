import { mapService } from './map.service.js';
// This is our controller it is responsible for rendering the view and action upon events


window.addEventListener('load', onInit)

function onInit() {
    // checkUrlLocation();
    onGetMyLocation()
    bindEvents()
}

function onGetMyLocation() {
    mapService.getMyLocation()
        .then(pos => {
            var crd = pos.coords;
            renderMap({ lat: crd.latitude, lng: crd.longitude })
        })
}

function checkUrlLocation() {
    // if (getParameterByName('lat'))
}

function bindEvents() {
    document.querySelector('.search-form').addEventListener('submit', onSearchAddress);
    document.querySelector('.search-btns.my-location-btn').addEventListener('click', onGetMyLocation);
}

function renderMap(latLang) {

    var location = latLang;

    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 16, center: location });

    var marker = new google.maps.Marker({ position: location, map });

    map.addListener('click', (mapsMouseEvent) => {
        let clickedLat = mapsMouseEvent.latLng.toJSON().lat;
        let clickedLng = mapsMouseEvent.latLng.toJSON().lng;
        location = { lat: clickedLat, lng: clickedLng }
        marker = new google.maps.Marker({ position: location, map });

        mapService.addNewLocation(location)

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

function onSearchAddress(ev) {
    ev.preventDefault();
    let inputVal = document.querySelector('.search-form .search-input').value;
    mapService.addNewAddress(inputVal)
        .then(res =>{
            renderMap({lat: res.lat , lng: res.lng});
        })
}
