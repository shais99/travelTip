import { mapService } from './map.service.js';
import { Location } from './location-preview.js';
// This is our controller it is responsible for rendering the view and action upon events

export const mapController = {
    renderSavedLocations,
    onOpenUpdateModal
}

window.addEventListener('load', onInit)

function onInit() {
    // checkUrlLocation();
    onGetMyLocation()
    bindEvents()
    renderSavedLocations()
}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none';
}

function onOpenUpdateModal(locationId) {
    document.querySelector('.modal').style.display = 'block';
    
    let locationIdx = mapService.gLocations.findIndex(location => {
        return locationId === location.id;
    })
    document.querySelector('.details-modal h2 span').innerText = mapService.gLocations[locationIdx].info;
    
    let updateInput = document.querySelector('.update-location-form input');
    updateInput.value = mapService.gLocations[locationIdx].info

    document.querySelector('.update-location-form').addEventListener('submit', (locationId, event) => {
        onUpdateLocation(locationIdx, updateInput.value);
    })
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
    document.querySelector('.screen').addEventListener('click', onCloseModal);
    document.querySelector('.close-modal').addEventListener('click', onCloseModal);
}

function onUpdateLocation(id, newName) {
    event.preventDefault();
    mapService.updateLocation(id, newName);
}

function renderMap(latLang) {
    
    var location = latLang;

    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 16, center: location });

    var marker = new google.maps.Marker({ position: location, map });
    renderSavedLocations()


    renderLocation()
    renderSavedLocations()

    map.addListener('click', (mapsMouseEvent) => {
        let clickedLat = mapsMouseEvent.latLng.toJSON().lat;
        let clickedLng = mapsMouseEvent.latLng.toJSON().lng;
        location = { lat: clickedLat, lng: clickedLng }
        marker = new google.maps.Marker({ position: location, map });
    
        mapService.addNewLocation(location)
        .then(res => {
            renderMap(location)
        })
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
        .then(res => {
            renderMap({ lat: res.lat, lng: res.lng });
        })
}

function renderSavedLocations() {
    let elMyLocationsContainer = document.querySelector('.my-locations-container');
    elMyLocationsContainer.innerHTML = '';
    mapService.gLocations.forEach((location, idx) => {
        let locationPreview = new Location(location.info, location.weather, location.lat, location.lng, mapService.gLocations[idx].id)
        const elLocation = locationPreview.render();

        document.querySelector('.my-locations-container').appendChild(elLocation);
    })
}


function renderLocation(){
    let currLoc = mapService.getCurrLoc()
    if(!currLoc) return;
    document.querySelector('.curr-location span').innerHTML = currLoc.info
}
