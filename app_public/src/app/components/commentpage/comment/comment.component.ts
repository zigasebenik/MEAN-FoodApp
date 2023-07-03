import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import { Comment } from "../../../classes/Comment";
import { FrifoodPodatkiService} from "../../../services/frifood-podatki.service";
import {User} from "../../../classes/User";
import {AvtentikacijaService} from "../../../services/avtentikacija.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {

  closeResult: string;

  obrazecNapaka: string;
  canChange: boolean;
  @Input() user: User;


  constructor(private modalService: NgbModal, private FrifoodPodatkiService: FrifoodPodatkiService, private avtentikacija: AvtentikacijaService) {
  }


  public deleteComment():void {
    let komentar = {
      komentarID: this.komentar._id
    };
    this.FrifoodPodatkiService.deleteComment(komentar).then(komentar => {
      //console.log("Komentar izbrisan", komentar);
      this.komentar = undefined;
    });
  }

  public updateComment(data: any):void {

    if(data.newCommentText.length > 0) {
      let komentar = {
        komentarID: this.komentar._id,
        newCommentText: data.newCommentText,
        rating: data.rating
      };
      this.FrifoodPodatkiService.updateComment(komentar).then(rez => {
        //console.log("Komentar posodobljen", rez);
        this.komentar.comment = komentar.newCommentText;
        this.komentar.rating = komentar.rating;
      });
      this.modalService.dismissAll();
    }
    else
      this.obrazecNapaka = "Komentar ne more ostati prazen !!!"
  }


  @Input() komentar: Comment;

  ngOnInit() {



    if(this.komentar.author != undefined && this.user != undefined)
    {


      //console.log("this.komentar.author._id ",this.komentar.author._id, "this.user._id ",this.user._id)
      if(this.komentar.author._id == this.user._id)
        this.canChange = true;
      else
        this.canChange = false;

    }



  }
}
