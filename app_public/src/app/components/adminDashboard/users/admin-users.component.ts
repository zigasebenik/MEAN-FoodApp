import { Component, OnInit } from '@angular/core';
import {FrifoodPodatkiService} from "../../../services/frifood-podatki.service";
import {User} from "../../../classes/User";
import {Router} from "@angular/router";
import {AvtentikacijaService} from "../../../services/avtentikacija.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private frifoodPodatkiService: FrifoodPodatkiService, private router: Router, private authenticator: AvtentikacijaService) { }

  public users: User[] = [];

  private getUsers(): void {
    this.frifoodPodatkiService.getUporabniki().then(
      (data) => {
        for(let i = 0; i < data.length; i++){
          if(data[i]._id != this.authenticator.decodeToken()._id){
            this.users.push(data[i]);
          }
        }
      }
    )
  }

  private redirect(user: User): void {
    let url: string = '/admin/user/';
    this.router.navigate([url + user._id])
  }

  ngOnInit() {
    this.getUsers();
  }

}
