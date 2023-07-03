import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal-pogoji',
  templateUrl: './modal-pogoji.component.html',
  styleUrls: ['./modal-pogoji.component.css']
})
export class ModalPogojiComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalPogojiComponent>,
              private router: Router,) { }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close();
  }
}
