import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AvtentikacijaService} from "../../services/avtentikacija.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private avtentikacija: AvtentikacijaService, private router: Router) {}

  ngOnInit() {
    this.avtentikacija.logOut();
    this.router.navigate(['/']);
  }

}
