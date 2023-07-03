import { Component, OnInit } from '@angular/core';
import {AvtentikacijaService} from "../../services/avtentikacija.service";
import { ZgodovinaService } from '../../services/zgodovina.service';
import {Router} from "@angular/router";
import {FrifoodPodatkiService} from "../../services/frifood-podatki.service";

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {

  constructor(public authenticate: AvtentikacijaService, private zgodovinaService: ZgodovinaService,private router: Router) { }



  ngOnInit() {

  }

  getRestaurantsBySearch() {

    let searchParameter = (<HTMLInputElement>document.getElementById("searchRestaurants")).value;

    this.router.navigate(["/restaurant-list/"+searchParameter]);
  }
}
