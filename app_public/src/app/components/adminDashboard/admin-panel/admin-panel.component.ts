import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";
import {AvtentikacijaService} from "../../../services/avtentikacija.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalPopupComponent} from "../../modal-popup/modal-popup.component";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: [
    './admin-panel.component.css'
  ]
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private authentication: AvtentikacijaService, private matDialog: MatDialog) { }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalPopupComponent, dialogConfig);
  }

  checkAdmin(){
    let loggedIn = this.authentication.isLoggedIn();
    if(loggedIn){
      let isAdmin = this.authentication.decodeToken().admin;
      if(!isAdmin){
        this.openModal();
        this.redirect('/');
      }
    }else{
      this.openModal();
      this.redirect('/');
    }

  }

  ngOnInit() {
    this.checkAdmin();
  }
}



