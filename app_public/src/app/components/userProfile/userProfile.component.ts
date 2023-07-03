import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FrifoodPodatkiService} from "../../services/frifood-podatki.service";
import {Router} from "@angular/router";
import { User } from "../../classes/User";
import {AvtentikacijaService} from "../../services/avtentikacija.service";
import {Comment} from "../../classes/Comment";

@Component({
  selector: 'app-userProfile',
  templateUrl: './userProfile.component.html',
  styleUrls: [
    './userProfile.component.css'
  ]
})

export class UserProfileComponent implements OnInit {

  constructor(
    private friFoodPodatkiServices: FrifoodPodatkiService,
    private router: Router,
    public autenticate: AvtentikacijaService
  ) {}

  private mail: string = this.autenticate.decodeToken().email;
  private user_id: string = this.autenticate.decodeToken()._id;
  public user: User;

  public activities: any;
  public src: string = "/assets/images/profile/user_avatar.png";

  private getUserByEmail(): void {
    this.user = this.autenticate.decodeToken();
    this.getComments();
  }

  private getUserById(): void {
    this.friFoodPodatkiServices.getUserById(this.user_id).then(
      (data) => {
        this.user = data;
        this.getComments();
      }
    )
  }

  private getComments(): void {
    this.friFoodPodatkiServices.getCommentsByUser(this.user._id).then(
      (data) => {
        this.activities = data;
      }
    )
  }

  public deleteComment(comment: Comment): void {
    let del = {
      komentarID: comment._id
    };

    this.friFoodPodatkiServices.deleteComment(del).then(
      (data) => {
        this.ngOnInit();
      }
    )
  }

  public redirect(url: string): void {
    this.router.navigate([url]);
  }

  ngOnInit(): void {
    this.getUserById();
  }


}

