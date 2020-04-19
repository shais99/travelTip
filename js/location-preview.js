import { makeRandId } from "./utils.js";

export class Location {
    static id = makeRandId();
    constructor(info, weather, lat, lng) {
        this.id = Location.id;
        this.info = info;
        this.weather = weather;
        this.lat = lat;
        this.lng = lng;
    }
}