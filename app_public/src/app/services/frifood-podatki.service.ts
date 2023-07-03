import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';

import { User } from '../classes/User';
import {Restaurant} from "../classes/Restaurant";
import {Comment} from "../classes/Comment";
import { environment } from '../../environments/environment';
import {Analytics} from "../classes/Analytics";
import {Observable, Subject} from "rxjs";
import {AvtentikacijaService} from "./avtentikacija.service";
import {ModalPopupComponent} from "../components/modal-popup/modal-popup.component";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class FrifoodPodatkiService {

  constructor(private http: HttpClient, private authenticate: AvtentikacijaService, private matDialog: MatDialog) { }

  private apiUrl = 'http://localhost:3000/api';

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

  private myError(napaka: string): void {
    this.openModal();
    console.error('Prišlo je do napake (401): Unauthorized access. | ', napaka);
  }

  public updateComment(podatkiObrazca: any): Promise<Comment> {
    const url: string = `${environment.apiUrl}/comments/update`;
    if(!this.authenticate.isLoggedIn()){
      this.myError("User not logged in!");
    }else {
      const httpLastnosti = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authenticate.shramba.getItem('zeton')}`
        })
      };
      return this.http
        .put(url, podatkiObrazca, httpLastnosti)
        .toPromise()
        .then(odgovor => odgovor as Comment)
        .catch(this.obdelajNapako);
    }
  }

  public updateUser(podatkiObrazca: any): Promise<User> {
    const url: string = `${environment.apiUrl}/users`;
    if(!this.authenticate.isLoggedIn()) {
      this.myError("User not logged in");
    } else {
      const httpLastnosti = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authenticate.shramba.getItem('zeton')}`
        })
      };
      return this.http
        .put(url, podatkiObrazca, httpLastnosti)
        .toPromise()
        .then(responde => responde as unknown as User)
        .catch(this.obdelajNapako);
    }
  }

  public getCommentsByUser(userID: string): Promise<Comment[]> {
    const url: string = `${environment.apiUrl}/commentAuthor/${userID}`;

    return this.http
      .get(url)
      .toPromise()
      .then(data => data as Comment[])
      .catch(this.obdelajNapako);
  }


  public deleteComment(podatkiObrazca: any) {
    const url: string = `${environment.apiUrl}/comments/delete/${podatkiObrazca.komentarID}`;
    if(!this.authenticate.isLoggedIn()){
      this.myError("User not logged in!");
    }else {
      const httpLastnosti = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authenticate.shramba.getItem('zeton')}`
        })
      };
      return this.http
        .delete(url, httpLastnosti)
        .toPromise()
        .catch(this.obdelajNapako);
    }
  }

  public dodajKomentar(podatkiObrazca: any): Promise<Comment> {
    const url: string = `${environment.apiUrl}/comments`;
    if(!this.authenticate.isLoggedIn()){
      this.myError("User not logged in!");
    }else {
      const httpLastnosti = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authenticate.shramba.getItem('zeton')}`
        })
      };
      return this.http
        .post(url, podatkiObrazca, httpLastnosti)
        .toPromise()
        .then(odgovor => odgovor as Comment)
        .catch(this.obdelajNapako);
    }
  }

  public getComments(): Promise<Comment[]> {
    const url: string = `${environment.apiUrl}/comments`;

    return this.http
      .get(url)
      .toPromise()
      .then(responde => responde as Comment[])
      .catch(this.obdelajNapako);
  }

  getUporabniki(): Promise<User[]> {
    const url: string = `${environment.apiUrl}/users`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as User[])
      .catch(this.obdelajNapako);
  }

  getRestaurantById(id: string): Promise<Restaurant> {
    const url: string = `${environment.apiUrl}/restaurants/${id}`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as Restaurant[])
      .catch(this.obdelajNapako);
  }

  dodajuporabnika(user: User): Promise<User> {
    const url: string = `${environment.apiUrl}/registracija`;
    console.log(url);
    return this.http
      .post(url, user)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  prijavuporabnika(user: any): Promise<any> {
    const url: string = `${environment.apiUrl}/prijava`;
    console.log(url);
    return this.http
      .post(url, user)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(this.obdelajNapako);
  }

  getUserById(userID: string): Promise<User> {
    const url: string = `${environment.apiUrl}/user/${userID}`;
    console.log(url);
    return  this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as User)
      .catch(this.obdelajNapako);
  }

  getuserByEmail(email: string): Promise<User> {
    const url: string = `${environment.apiUrl}/uporabniki/${email}`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as User)
      .catch(this.obdelajNapako);
  }

  getCommentsByRestaurantId(restaurantIdANDPage: any): Promise<unknown> {
    const url: string = `${environment.apiUrl}/commentsByRestaurantIdPerPage/${restaurantIdANDPage.restaurantId}/${restaurantIdANDPage.pageNumber}`;
    console.log(url);
    return this.http
      .get(url, restaurantIdANDPage)
      .toPromise()
      .then(odgovor => odgovor as unknown)
      .catch(this.obdelajNapako);
  }

  addNewRestaurant(restaurantForm: Restaurant): Promise<Restaurant> {
    const url: string = `${environment.apiUrl}/restaurantADD`;
    console.log(url);
    console.log("data to send ->", restaurantForm);
    if(!this.authenticate.isLoggedIn()){
      this.myError("User not logged in!");
    }else{
      const httpLastnosti = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authenticate.shramba.getItem('zeton')}`
        })
      };
      return this.http
        .post(url, restaurantForm, httpLastnosti)
        .toPromise()
        .then(response => response as Restaurant)
        .catch(this.obdelajNapako);
    }
  }

  getRestaurnats(): Promise<Restaurant[]> {
    const url: string = `${environment.apiUrl}/restaurants`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Restaurant[])
      .catch(this.obdelajNapako);
  }

  deleteRestaurant(id: string): Promise <Restaurant> {
    const url: string = `${environment.apiUrl}/deleteRestaurant/${id}`;
    if(!this.authenticate.isLoggedIn()){
      this.myError("User not logged in!");
    }else {
      const httpLastnosti = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authenticate.shramba.getItem('zeton')}`
        })
      };
      return this.http
        .delete(url, httpLastnosti)
        .toPromise()
        .then(response => response as Restaurant)
        .catch(this.obdelajNapako);
    }
  }

  updateAnalyticsByName(analytics: any): Promise<Analytics> {
    const url: string = `${environment.apiUrl}/analytics`;
    console.log(url);
    return this.http
      .put(url, analytics)
      .toPromise()
      .then(response => response as Analytics)
      .catch(this.obdelajNapako);
  }

  returnAnalytics(): Promise<Analytics[]> {
    const url: string = `${environment.apiUrl}/analytics`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Analytics[])
      .catch(this.obdelajNapako);
  }


  public getRestaurantsBySearch(podatki: string): Promise<Restaurant[]> {
    const url: string = `${environment.apiUrl}/search/${podatki}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as unknown as Restaurant[])
      .catch(this.obdelajNapako);
  }



  public getRestaurants(): Promise<Restaurant[]> {
    const url: string = `${environment.apiUrl}/restaurants`;
    console.log(url);
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Restaurant[])
      .catch(this.obdelajNapako);
  }


  private obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }

  public upload(files: any){
      const url: string = `${environment.apiUrl}/upload`;
    if(!this.authenticate.isLoggedIn()){
      this.myError("User not logged in!");
    }else {
      const httpLastnosti = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.authenticate.shramba.getItem('zeton')}`
        })
      };
      this.http
        .post(url, files, httpLastnosti)
        .subscribe((response) => {
          console.log('response received is ', response);
        })
    }

    /*

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      console.log(file.name);
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', environment.apiUrl+"/upload", formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(percentDone)
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
    */
  }


}
