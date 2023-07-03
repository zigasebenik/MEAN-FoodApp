import { Component, OnInit } from '@angular/core';
import {FrifoodPodatkiService} from "../../../services/frifood-podatki.service";
import { User } from "../../../classes/User";
import {Router} from "@angular/router";
import {Restaurant} from "../../../classes/Restaurant";
import {AvtentikacijaService} from "../../../services/avtentikacija.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './adminLocations.component.html',
  styleUrls: ['./adminLocations.component.css']
})

export class AdminLocationsComponent implements OnInit {

  constructor(private friFoodPodatkiServices: FrifoodPodatkiService, private router: Router, private authentication: AvtentikacijaService) {}

  private mail: string = this.authentication.decodeToken().elektronskiNaslov;
  public user: User;



  public locations: Restaurant[];

  private getUserByEmail(): void {
    this.friFoodPodatkiServices.getuserByEmail(this.mail).then(
      (data) => {
        this.user = data;
      }
    )
  }


  private getRestaurants(): void {
    this.friFoodPodatkiServices.getRestaurnats().then(
      (data) => {
        this.locations = data;
      }
    )
  }

  public deleteLocation (location: string): void {
    this.friFoodPodatkiServices.deleteRestaurant(location).then();

    this.ngOnInit();
  }

  public redirectToLocation (location: string): void {
    let url: string = "restaurantView/" + location;
    this.router.navigate([url]);
  }


  ngOnInit(): void {
    this.getUserByEmail();
    this.getRestaurants();
  }

}

