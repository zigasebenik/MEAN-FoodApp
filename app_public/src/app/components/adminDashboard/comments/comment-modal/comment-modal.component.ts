import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Comment} from "../../../../classes/Comment";
import {User} from "../../../../classes/User";

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css'],

})
export class CommentModalComponent implements OnInit {
  closeResult: string;
  @Input() buttonDescription: string;
  @Input() naslov: string;
  @Input() closeButton: string;

  @Input() openButonClass: string;

  @Input() restaurantPathID: string;
  @Input() user: User = undefined;


  @Output() formSubmitEvent = new EventEmitter();


  public formData = {
    restaurant: '',
    author: '',
    newCommentText: '',
    rating: 5
  };
  errorString: string;

  constructor(private modalService: NgbModal) {}


  open(content) {

    console.log(this.restaurantPathID, "<-->"+this.user);

    this.modalService.open(content, {centered: true, }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  submitForm(content){
    this.errorString = "";

    this.formData.restaurant = this.restaurantPathID;
    this.formData.author = this.user._id;
    this.formData.newCommentText = (<HTMLInputElement>document.getElementById("newCommentText")).value;
    console.log(this.formData);

    if (this.formData.rating > 0 && this.formData.newCommentText.length > 0) {
      this.formSubmitEvent.emit(this.formData);
    } else {
      this.errorString = "Zahtevani so vsi podatki, prosim poskusite ponovno!";
    }
  }

  ngOnInit(): void {
  }
}
