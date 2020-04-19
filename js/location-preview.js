import { makeRandId } from "./utils.js";
import { mapService } from "./map.service.js";
import { mapController } from "./map.controller.js";

export class Location {
    constructor(info, weather, lat, lng) {
        this.id = makeRandId();
        this.info = info;
        this.weather = weather;
        this.lat = lat;
        this.lng = lng;
    }
    render() {
        const locationContainer = document.createElement('div')
        locationContainer.classList.add('single-location')
        locationContainer.classList.add('flex')
        locationContainer.classList.add('column')

        locationContainer.innerHTML = `<p>${this.id}</p>
                                <p>${this.info}</p>
                                <p>Weather is here!</p>

                                <div class="single-location-actions flex column align-center">
                                    <button class="delete-location location-btns">Delete</button>
                                    <button class="update-location location-btns">Update</button>
                                </div>`
        locationContainer.querySelector('.delete-location').addEventListener('click', this.onDelete);
        locationContainer.querySelector('.update-location').addEventListener('click', this.onUpdate);
        return locationContainer
    }
    onDelete = () => {
        mapService.deleteLocation(this.id);
        mapController.renderSavedLocations();
    }
    onUpdate() {
        mapService.updateLocation(this.id);
        mapController.renderSavedLocations();
    }
}