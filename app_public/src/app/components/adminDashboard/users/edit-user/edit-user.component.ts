import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../classes/User";
import {FrifoodPodatkiService} from "../../../../services/frifood-podatki.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AvtentikacijaService} from "../../../../services/avtentikacija.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    private frifoodService: FrifoodPodatkiService,
    private router: ActivatedRoute,
    private r: Router,
    private avtentikacija: AvtentikacijaService) {
    this.getUserById();
  }

  public id: string;
  public user: User = new User();
  public selected: string;
  public notSelected: string;
  public opozorilo:string;

  async getUserById(): Promise<any> {
    await this.frifoodService.getUserById(
      this.router.snapshot.paramMap.get("id")
    ).then(
      (data) => {
        this.user = data;
        if(this.user.admin) {
          this.selected = "Administrator";
          this.notSelected = "Običajen uporabnik";
        } else {
          this.selected = "Običajen uporabnik";
          this.notSelected = "Administrator";
        }
      }
    )
  }


  public updateUser(): void {

    try {
      let typeOfUser :string = (<HTMLInputElement>document.getElementById('type')).value;

      console.log(this.avtentikacija.decodeToken()._id)

      // if(this.avtentikacija.decodeToken()._id === this.user._id) {
      //   alert("marija");
      //   return null;
      // }


      if (this.avtentikacija.decodeToken()._id != this.user._id) {
        if (typeOfUser === "Administrator")
          this.user.admin = true;
        else
          this.user.admin = false;
      }

      this.frifoodService.updateUser(this.user)
        .then(
          (data) => {
            data = this.user;
            this.r.navigate(["/admin/users"]);
          }
        );
    } catch (e) {
      return null;
    }

  }

  ngOnInit(): void {
  }

}
