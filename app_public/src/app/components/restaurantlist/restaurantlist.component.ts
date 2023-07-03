import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Restaurant} from "../../classes/Restaurant";
import {FrifoodPodatkiService} from "../../services/frifood-podatki.service";
import LatLng = google.maps.LatLng;
import { AgmCoreModule } from '@agm/core';
import {GoogleMapsService} from "../../services/google-maps.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-restaurantlist',
  templateUrl: './restaurantlist.component.html',
  styleUrls: ['./restaurantlist.component.css']
})
export class RestaurantlistComponent implements AfterViewInit, OnInit {
  private elementRef: any;

  constructor(private renderer: Renderer2, private frifoodPodatkiService: FrifoodPodatkiService, private googleMapsService: GoogleMapsService, private route: ActivatedRoute) {
  }



  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  posLjubljana = {
    lat: 46.056946,
    lng: 14.505751
  };
  mapOptions: google.maps.MapOptions = {
    center: this.posLjubljana,
    zoom: 8,
  };
  coordinates;
  changed: boolean;

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);
    //this.marker.setMap(this.map);

    this.changed = false;
    this.infoWindow = new google.maps.InfoWindow;

   // console.log(this.coordinates);
    if (this.coordinates != undefined) {
      this.infoWindow.setPosition(this.coordinates);
      this.infoWindow.setContent('You are here.');
      this.infoWindow.open(this.map);
      this.map.setCenter(this.coordinates);
    } else {
      this.map.setZoom(14);
      this.map.setCenter(this.posLjubljana);
    }

  }

  googleRestaurants = [];
  circles = [];
  markers = [];
  fetchLocations($event) {
    //console.log($event);
    this.restaurants = [];
    this.googleRestaurants = [];
    for (let circle of this.circles) {
      circle.setMap(null);
    }

    for (let marker of this.markers) {
      marker.setMap(null);
    }

    let lat = $event.latLng.lat();
    let lng = $event.latLng.lng();
    //console.log(lat + ', ' + lng);

    let radius = new google.maps.Circle({
      map: this.map,
      radius: 300,
      center: $event.latLng,
      fillColor: '#777',
      fillOpacity: 0.1,
      strokeColor: '#AA0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      draggable: false,    // Dragable
      editable: false      // Resizable
    });
    this.circles.push(radius);
    let location = new google.maps.LatLng(lat, lng);
    this.map.panTo(location);
    this.map.setCenter(location);

    let request = {
      location: location,
      radius: 300,
      query: 'restaurants',
      fields: ['icon', 'photos', 'name', 'place_id', 'formatted_address'],
    };

    let service = this.googleMapsService.googleMapsPlacesService(this.map);
    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        let resultCount = 0;
        for (let i = 0; i < results.length; i++) {
          if (this.googleMapsService.googleDistance(results[i].geometry.location, location) < request.radius) {
            this.markers.push(this.createMarker(results[i]));
            // if (results[i].photos !== undefined && results[i].photos.length > 0) {
            // } else {
            //   results[i].photos = 'https://www.themezzaninegroup.com/wp-content/uploads/2017/12/photo-not-available.jpg'
            // }
            resultCount++;
            this.googleRestaurants.push(results[i]);
          }
        }
        //console.log(this.googleRestaurants);
      }
    });
  }

  createMarker(results: any) {
    let marker = new google.maps.Marker({
      map: this.map,
      position: results.geometry.location
    });
    return marker;
  }

  restaurants: Restaurant[];
  error: string;

  refreshRestaurants() {
    this.frifoodPodatkiService.getRestaurants().then(restaurants => {
      this.googleRestaurants = [];
      console.log("Received restaurants");
      this.restaurants = restaurants;
    })
  }

  handleAddress(address) {
    let request = {
      query: address,
      fields: ['name', 'geometry'],
    };

    for (let circle of this.circles) {
      circle.setMap(null);
    }

    for (let marker of this.markers) {
      marker.setMap(null);
    }

    let service = this.googleMapsService.googleMapsPlacesService(this.map);

    service.findPlaceFromQuery(request, (results, status) => {
      //console.log(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          this.markers.push(this.createMarker(results[i]));
        }
        this.map.setCenter(results[0].geometry.location);
        document.getElementById("googleMap").focus();
      } else {
        //window.alert("Sorry, this location was not found.\nYou will be redirected to your current location.");
        this.mapInitializer();
      }
    });
  }

  ngOnInit(): void {

    this.error = "";

    this.route.paramMap.subscribe(params => {

      let searchVal = params.get("searchVal")

      console.log(searchVal)

      if(searchVal != undefined && searchVal != "")
      {
        this.frifoodPodatkiService.getRestaurantsBySearch(searchVal.toString()).then(restaurants => {
          console.log("restaurants->",restaurants);
          this.restaurants = restaurants;

          if(this.restaurants.length == 0)
            this.error = "Nobene restavracije s tem imenom :("

        });
      }
      else
      {

        this.frifoodPodatkiService.getRestaurants().then(restaurants => {
          console.log("Received restaurants");
          this.restaurants = restaurants;

          if(this.restaurants.length == 0)
            this.error = "Nobena restavracija ni vnešena :("

        });

      }

    });

  }

  ngAfterViewInit() {
    this.mapInitializer();

    google.maps.event.addListener(this.map, 'click',  $event => {
      this.fetchLocations($event);
    });
  }
}
