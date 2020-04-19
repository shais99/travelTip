import { storageService } from './storage-service.js';

const KEY_LOCATIONS = 'user_locations'
var gLocations;

const KEY_API_LOCATION = "user_search"
var gApiLocation;



export const mapService = {
    getSearchLocation,
    getMyLocation,
}


function getMyLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}


function getSearchLocation() {
    let gitUsers = storageService.loadFromStorage(KEY_API_LOCATION) || []
    if (gitUsers && gitUsers.length) {
        gGitUsers = gitUsers;
        storageService.saveToStorage(GIT_USERS_KEY, gGitUsers)
        getUsersRepository();
        return;
    }

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=jerusalem&key=AIzaSyDpw1AT3xL57va9uSK8SgMhqaFJMl--G-s')
        .then(res => res.data.results)
        .then(console.log)
    // .then(results => {
    //     gitUsers = results
    //     gGitUsers = gitUsers;
    //     saveToStorage(KEY_API_LOCATION, gApiLocation)
    //     getUsersRepository();
    // })

    axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=31.768319,lng: 35.21371&key=AIzaSyDpw1AT3xL57va9uSK8SgMhqaFJMl--G-s')
        .then(res => res.data.results)
        .then(console.log)
    // .then(results => {
    //     gitUsers = results
    //     gGitUsers = gitUsers;
    //     saveToStorage(KEY_API_LOCATION, gApiLocation)
    //     getUsersRepository();
    // })
}

