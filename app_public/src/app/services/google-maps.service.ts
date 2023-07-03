import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  constructor() {
  }

  // connect to google places service
  googleMapsPlacesService(map: google.maps.Map) {
    return new google.maps.places.PlacesService(map);
  }

  // calculate distance between two locations on a google map
  googleDistance(location1, location2) {
    return google.maps.geometry.spherical.computeDistanceBetween(location1, location2);
  }

}
