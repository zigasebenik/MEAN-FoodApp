import { Inject, Injectable } from '@angular/core';
import { SHRAMBA_BRSKALNIKA } from '../classes/token-storage';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AvtentikacijaService {

  constructor(@Inject(SHRAMBA_BRSKALNIKA) public shramba: Storage, private router: Router) { }


  public isAdmin(): boolean{
    var data = this.decodeToken();
    if(data.admin === true){
      return true;
    }else{
      return false;
    }
  }

  public isLoggedIn(): boolean{
    if(this.vrniZeton()){
      if(!this.checkExpired()){
        return false;
      }else{
        return true;
      }
    }else{
      return false;
    }
  }

  public logOut(): void{
    this.shramba.removeItem('zeton');
    this.shramba.clear();
  }

  private checkExpired(): boolean{
    var decoded = this.decodeToken();
    var expires = decoded.datumPoteka;
    if(Date.now() >= expires * 1000){
      this.logOut();
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  private urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        // tslint:disable-next-line:no-string-throw
        throw 'Illegal base64url string!';
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  public decodeToken() {
    var token = this.vrniZeton().toString();
    if (token === null || token === '') { return { 'upn': '' }; }

    const parts = token.split('.');

    //console.log(parts);

    if (parts.length !== 3) {

      throw new Error('JWT must have 3 parts');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }

  public vrniZeton(): string {
    //console.log("zeton->",this.shramba.getItem('zeton'))
    return this.shramba.getItem('zeton');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('zeton', zeton);
  }
}
