import { storageService } from './storage-service.js';
import { Location } from './location-preview.js';

const KEY_LOCATIONS = 'user_locations'
var gLocations = storageService.loadFromStorage(KEY_LOCATIONS) || []

export const mapService = {
    getLocationBy,
    getMyLocation,
    addNewLocation,
    addNewAddress,
    gLocations,
    deleteLocation,
    updateLocation
}

function deleteLocation(locationId) {
    let locationIdx = gLocations.findIndex(location => {
        return locationId === location.id;
    })
    gLocations.splice(locationIdx, 1)
    storageService.saveToStorage(KEY_LOCATIONS, gLocations)
}

function updateLocation(locationId) {
    console.log(gLocations);
    
    console.log('popoUpdate');
}

function addNewLocation(location) {
    let locationWeather = 'weather soon!';

    return mapService.getLocationBy('coor', location.lat, location.lng)
        .then(res => {
            let locationInfo = res[0].formatted_address
            let locationSave = new Location(locationInfo, locationWeather, location.lat, location.lng)
            gLocations.push(locationSave)
            storageService.saveToStorage(KEY_LOCATIONS ,gLocations)
            return location;
        })
}

function addNewAddress(address) {
    let locationWeather = 'weather soon!';

    return mapService.getLocationBy('name', undefined, undefined, address)
        .then(res => {
            console.log(res)
            let locationInfo = res[0].formatted_address
            let locationCurr = res[0].geometry.location
            let locationSave = new Location(locationInfo, locationWeather, locationCurr.lat, locationCurr.lng)
            gLocations.push(locationSave)
            storageService.saveToStorage(KEY_LOCATIONS ,gLocations)
            return locationCurr
        })
}


function getMyLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

function getLocationBy(getBy, lat, lng, address) {
    if (getBy === 'coor') {
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyATABptZsA3DuWoaROhAiTYdEEIUJ743Pc`)
            .then(res => res.data.results)
    } else if (getBy === 'name') {
        let addressClean = address.replace(/ /g, "%20")
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressClean}&key=AIzaSyATABptZsA3DuWoaROhAiTYdEEIUJ743Pc`)
            .then(res => res.data.results)
    }
}
