import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FrifoodPodatkiService} from "../../services/frifood-podatki.service";
import {Analytics} from "../../classes/Analytics";
import { HttpClient } from '@angular/common/http';
import {Restaurant} from "../../classes/Restaurant";
import {FileUploader, FileUploadModule} from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalPopupComponent} from "../modal-popup/modal-popup.component";
import {ModalPogojiComponent} from "../modal-pogoji/modal-pogoji.component";
import {AvtentikacijaService} from "../../services/avtentikacija.service";

@Component({
  selector: 'app-restaurantadd',
  templateUrl: './restaurantadd.component.html',
  styleUrls: ['./restaurantadd.component.css']
})
export class RestaurantaddComponent implements OnInit {

  constructor(private renderer: Renderer2, private frifoodPodatkiService: FrifoodPodatkiService, private router: Router, private matDialog: MatDialog, private authenticator: AvtentikacijaService) { }

  @ViewChild('file', null) file
  public files: Set<File> = new Set()

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
  openModal2() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component-2";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalPogojiComponent, dialogConfig);
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }
    this.frifoodPodatkiService.upload(this.files);
  }
  uploadedFiles: Array < File > ;
  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  upload() {



    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    this.frifoodPodatkiService.upload(formData);

  }

  public restaurantForm = {
    name: '',
    description: '',
    address: '',
    rating: 0,
    mealPrice: 0,
    student: false,
    studentPrice: 0,
    timeTable: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
    comments: '',
    icon: '',
    front: '',
  };

  public formError = '';
  public uploader:FileUploader = new FileUploader({url: environment.apiUrl});

  public dodajRestavracijo(): void {
    this.restaurantForm.name = (<HTMLInputElement>document.getElementById("inputRestaurantName")).value;
    this.restaurantForm.description = (<HTMLInputElement>document.getElementById("inputRestaurantDescription")).value;
    this.restaurantForm.address = (<HTMLInputElement>document.getElementById("inputRestaurantAddress")).value;
    this.restaurantForm.student = (<HTMLInputElement>document.getElementById("inputBoniYes")).checked;
    this.restaurantForm.studentPrice = +(<HTMLInputElement>document.getElementById("inputBoniCost")).value;
    this.restaurantForm.mealPrice = +(<HTMLInputElement>document.getElementById("inputMealCost")).value;
    this.formError = "";

    console.log(name);

    if(this.restaurantForm.name == "" || this.restaurantForm.description=="" || this.restaurantForm.address == ""
    || (this.restaurantForm.student && this.restaurantForm.studentPrice === 0) || this.restaurantForm.mealPrice === 0)
      this.formError = "Polja ne smejo biti prazna";

    else
    {

      if ((<HTMLInputElement>document.getElementById("openMonday")).checked) {
        this.restaurantForm.timeTable.monday = 'ZAPRTO';
      } else if((<HTMLInputElement>document.getElementById("inputMondayFrom")).value){
        this.restaurantForm.timeTable.monday = (<HTMLInputElement>document.getElementById("inputMondayFrom")).value
          + '-' + (<HTMLInputElement>document.getElementById("inputMondayTo")).value
      }
      else
        this.formError = "prosim podajte cas";

      if ((<HTMLInputElement>document.getElementById("openTuesday")).checked) {
        this.restaurantForm.timeTable.tuesday = 'ZAPRTO';
      } else if((<HTMLInputElement>document.getElementById("inputTuesdayFrom")).value){
        this.restaurantForm.timeTable.tuesday = (<HTMLInputElement>document.getElementById("inputTuesdayFrom")).value
          + '-' + (<HTMLInputElement>document.getElementById("inputTuesdayTo")).value
      }
    else
      this.formError = "prosim podajte cas";

      if ((<HTMLInputElement>document.getElementById("openWednesday")).checked) {
        this.restaurantForm.timeTable.wednesday = 'ZAPRTO';
      } else if((<HTMLInputElement>document.getElementById("inputWednesdayFrom")).value)
      {
        this.restaurantForm.timeTable.wednesday = (<HTMLInputElement>document.getElementById("inputWednesdayFrom")).value
          + '-' + (<HTMLInputElement>document.getElementById("inputWednesdayTo")).value
      }
    else
      this.formError = "prosim podajte cas";

      if ((<HTMLInputElement>document.getElementById("openThursday")).checked) {
        this.restaurantForm.timeTable.thursday = 'ZAPRTO';
      } else if((<HTMLInputElement>document.getElementById("inputThursdayFrom")).value){
        this.restaurantForm.timeTable.thursday = (<HTMLInputElement>document.getElementById("inputThursdayFrom")).value
          + '-' + (<HTMLInputElement>document.getElementById("inputThursdayTo")).value
      }
    else
      this.formError = "prosim podajte cas";

      if ((<HTMLInputElement>document.getElementById("openFriday")).checked) {
        this.restaurantForm.timeTable.friday = 'ZAPRTO';
      } else if((<HTMLInputElement>document.getElementById("inputFridayFrom")).value){
        this.restaurantForm.timeTable.friday = (<HTMLInputElement>document.getElementById("inputFridayFrom")).value
          + '-' + (<HTMLInputElement>document.getElementById("inputFridayTo")).value
      }
    else
      this.formError = "prosim podajte cas";

      if ((<HTMLInputElement>document.getElementById("openSaturday")).checked) {
        this.restaurantForm.timeTable.saturday = 'ZAPRTO';
      } else if((<HTMLInputElement>document.getElementById("inputSaturdayFrom")).value){
        this.restaurantForm.timeTable.saturday = (<HTMLInputElement>document.getElementById("inputSaturdayFrom")).value
          + '-' + (<HTMLInputElement>document.getElementById("inputSaturdayTo")).value
      }
    else
      this.formError = "prosim podajte cas";

      if ((<HTMLInputElement>document.getElementById("openSunday")).checked) {
        this.restaurantForm.timeTable.sunday = 'ZAPRTO';
      } else if((<HTMLInputElement>document.getElementById("inputSundayFrom")).value)
      {
        this.restaurantForm.timeTable.sunday = (<HTMLInputElement>document.getElementById("inputSundayFrom")).value
          + '-' + (<HTMLInputElement>document.getElementById("inputSundayTo")).value
      }
    else
      this.formError = "prosim podajte cas";

      // this.restaurantForm.icon = (<HTMLInputElement>document.getElementById("file2")).value;
      // this.restaurantForm.front = (<HTMLInputElement>document.getElementById("file")).value;

      if(this.formError == "")
      this.frifoodPodatkiService.addNewRestaurant(this.restaurantForm as Restaurant).then(restaurant => {
        console.log("Restavracija dodana", restaurant);
        this.router.navigate(['restaurant-list']);
      });

    }


  }

  onFileSelectIcon(event) {
    if (event.target.files.length > 0) {

      console.log(event.target.files[0].name);

      this.restaurantForm.icon = event.target.files[0].name;
      let image = (<HTMLInputElement>document.getElementById("output2"));
      image.src = URL.createObjectURL(event.target.files[0]);
    }
  }

  onFileSelectFront(event) {

    console.log(event);

    if (event.type ) {
      let file = event.target.files[0];
      let fileReader = new FileReader();

      console.log(fileReader.readAsText(file));

      console.log(event.target.files[0]);
      this.restaurantForm.front = event.target.files[0];
      let image = (<HTMLInputElement>document.getElementById("output"));
      image.src = URL.createObjectURL(event.target.files[0]);
    }
  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  private checkUser(){
    let loggedIn = this.authenticator.isLoggedIn();
    if(!loggedIn){
      this.openModal();
      this.redirect('/');
    }
  }

  ngOnInit() {
    this.checkUser();
    const script = this.renderer.createElement('script');
    script.src = `./assets/javascripts/restaurantAddValidation.js`;
    this.renderer.appendChild(document.head, script);

    let analytics: Analytics;
    analytics = {
      _id: '',
      name: 'RestaurantAddPageViews',
      numAPICalls: 0,
    };
    this.frifoodPodatkiService.updateAnalyticsByName(analytics).then(r =>
      console.log(r)
    );
  }

}



