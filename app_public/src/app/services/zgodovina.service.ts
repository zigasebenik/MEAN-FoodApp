import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {ZgodovinaPipePipe} from "../pipes/zgodovina-pipe.pipe";

@Injectable({
  providedIn: 'root'
})

export class ZgodovinaService {

  private urlNaslovi: string[] = [];

  constructor(private usmerjevalnik: Router, public zgodovinaPipe: ZgodovinaPipePipe) {
    this.usmerjevalnik.events
      .pipe(zgodovinaPipe.transform(dogodekUsmerjanja => dogodekUsmerjanja instanceof NavigationEnd))
      .subscribe((dogodekUsmerjanja: NavigationEnd) => {
        const url = dogodekUsmerjanja.urlAfterRedirects;
        this.urlNaslovi = [...this.urlNaslovi, url];
      });
  }

  public vrniPredhodnjeUrlNaslove(): string {
    const dolzina = this.urlNaslovi.length;
    return dolzina > 1 ? this.urlNaslovi[dolzina - 2]: '/';
  }

  public vrniPredhodnjeUrlNasloveBrezPrijaveInRegistracije(): string {
    const izloci: string[] = ['/registracija', '/prijava'];
    const filtrirano = this.urlNaslovi.filter(url => !izloci.includes(url));
    const dolzina = filtrirano.length;
    return dolzina > 1 ? filtrirano[dolzina - 1]: '/';
  }
}
