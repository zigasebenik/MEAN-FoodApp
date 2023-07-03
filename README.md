# Spletno programiranje 2019/2020

Lastni projekt pri predmetu **Spletno programiranje** v študijskem letu **2019/2020**.

Opozorilo (21.01.2020) - Google API ključ za Google Maps je bil izključen!

# 1. LP

Spletna aplikacija omogoča pregled nad restavracijami, ki jih uporabnik najde na seznamu vseh restavracij ter na zemljevidu. Vsaka restavracija ima vpisane lastnosti kot so odpiralni časi, menuji, komentarji uporabnikov, ocena ter cene. V kolikor restavracija ponuja obrok na študentski bon je to označeno skupaj s podatkom o doplačilu.

Uporabnik se lahko registrira ali prijavi. Prijavljenemu uporabniku je omogočeno vnašanje komentarjev k posamezni restvraciji in ocenjevanje le teh.

Administrator sistema ima pregled nad registrirani uporabniki. Administrator ima pregled nad vsemi komentarji in ocenami, ki jih lahko ureja in briše.

## Prijava in registracija uporabnika
### [Login.html](FRIFOOD/app_server/views/Login-Register/Login.html)
Stran za prijavit v sistem z možnostjo registracije
### [Register.html](FRIFOOD/app_server/views/Login-Register/Register.html)
Stran za registrirati v sistem, z potrditvijo registracije preko emaila in možnostjo obveščanja po emailu.
    
## [RestaurantView.html](FRIFOOD/app_server/views/Restaurant-View-Page/RestaurantView.html)
V tem pogledu se bo videl podrobnejši opis restavracije ter slike restavracije in komentarji, ki jih lahko pišejo uporabniki o restavracijah. Iz te strani se 
bo mozno prestaviti z navigacijo na dodajanje restavracije, zemljevid, link restavracije in nazaj na prvo stran

## [CommentPage.html](FRIFOOD/app_server/views/Comment-Page/CommentPage.html)
Stran na kateri lahko dodajamo komentarje o posamezni restavraciji, jih brišemo in urejamo

## Dodaj restavracijo [restaurant-add.html](docs/restaurant-add/restaurant-add.html)
Stran na kateri je implementirana forma za dodajanje restavracije v naš seznam restavracij.
Oddati je potrebno ime, naslov, opis restavracije in prav tako čas obratovanja.
Seveda ne smemo pozabiti na ceno doplačila za študentski meni (če restavracija podpira to možnost),
ter tudi povprečna malica. Priložili smo tudi možnost oddaje ikone restavracije in naslovne slike.  
Na koncu mora oseba, ki oddaja formo sprejeti pogoje uporabe, ter klikniti gumb za oddajo.
Kasneje mora administrator to oddajo pregledati in jo potrditi.

## Seznam restavracij [restaurant-list.html](docs/restaurant-list/restaurant-list.html)
Stran na kateri je implementiran seznam vseh restavracij oziroma restavracije,
ki so bile poiskane po ključnih besedah iz navigacijskega menija.
Na vsako stran oz. vnos v tem seznamu se da klikniti na kar se odzove zemljevid na desni strani in
pokaže kje se ta restavracija nahaja.

Vsak vnos seznama ima ime, naslov in oceno restavracije, ter ceno malice in doplačilo na bone če to restavracija omogoča.
Na koncu imamo pa še dve povezavi in sicer na _RestaurantView.html_ (Več o restavraciji), ter na _CommentPage.html_ (Oceni ali komentiraj).

## Glavna stran [front-page.html](docs/Front-page/front-page.html)
Stran ima implementiran pogled takoj po prijavi, kjer se userja lepo pozdravi na stran in mu da glavni action button
za pregled restavracij.

## Navigacijska vrstica [Navbar.html](docs/Navbar/Navbar.html)
Datoteka ima implementirano navigacijsko vrstico, ki bo uporabljena čez celotno stran. 
Na njej ima gumb za pregled podstrani, gumb za iskanje in gumb za pregled profila.

## Uporabniški profil

V sistemu obstajata dve vrsti uporabnikov: običajen uporabnik in administrator. Administrator ima dostop do vseh strani do katerih ima dostop navaden uporabnik kakor tudi do *Admin Dashboarda* od koder lahko ureja vsebino spletne aplikacije.

### Pregled uporabniškega profila [UserInfoPage.html](docs/profile/userProfile/UserInfoPage.html)
Stran do katerega lahko vsak prijavljen uporabnik dostopa prek navigacijske vrstice. Stran je razdeljena na levi pregledni pogled, kjer ima uporabnik pregled do, ob registraciji, vnešenih podatkov, kakor tudi dostop do lastne statistike aktivnosti na strani.

V desnem pregledu uporabnik najde svoje zadnje aktivnosti na strani.

Ob kliku na katero izmed aktivnosti se uporabniku prikaže okno (*bootstrap modal*) v katerem dostopa do podrobnosti posamezne aktivnosti.

#### Podrobnosti elementa: komentar [modal-editComment.html](docs/profile/userProfile/modals/modal-editComment.html)

Uporabnik lahko v prikazanem oknu (*bootstrap modal*) spreminja objavljen komentar ali ga popolnoma izbriše.


## Administratorska nadzorna plošča

Uporabnik, ki ima status administratorja, lahko preko svojega uporabniškega profila [UserInfoPage.html](docs/profile/userProfile/UserInfoPage.html) dostopa do administratorskega pogleda. To stori s klikom na *Administratorski pogled*.

V pregledu sistema lahko dostopa do komponent nadzorne plošče, ki so opisane v nadaljevanju. V glavne delu zaslonske makse lahko preko hitrih dostopov pregleduje odprte zahtevke ter do njih dostopa.

### Komentarji [Admin_CommentsView.html](docs/profile/adminDashboard/Admin_CommentsView.html)

V pregledu komentarjev lahko administrator dostopa do vseh objavljenih komentarjev. Za objavo komentarjev uporabnik ne potrebuje potrditve administratorja, vendar lahko administrator komentar uredi ali izbriše v kolikor smatra, da komentar krši pravila spletnega mesta.

Administrator s klikom na gumb za urejanje (ki se nahaja ob vsakem posameznem komentarju) dostopa do podrobnosti komentarja [modal-detailCommentsView.html](docs/profile/adminDashboard/modals/modal-detailCommentsView.html). Komentar lahko ureja ali izbriše.

### Lokacije [Admin_LocationsView.html](docs/profile/adminDashboard/Admin_LocationsView.html)

V pregledu lokacij lahko administrator pregleduje vse objavljene in arhivirane lokacije. Do podrobnosti posamezne lokacije dostopa s klikom na gumb. Lokacijo lahko tudi izbriše.

### Uporabniki [Admin_UsersView.html](docs/profile/adminDashboard/Admin_UsersView.html)

V pregledu uporabnikov lahko administrator pregleduje vse aktivne uporabnike. Do podrobnosti uporabnika dostopa s klikom na gumb za urejanje.

Uporabniku lahko ureja določene atribute preko pogleda [modal-detailUserView.html](docs/profile/adminDashboard/modals/modal-detailUserView.html).   

## Razlike brskalnikov
Primerjali smo brskalnike: Google Chrome, Firefox, Edge.

* Razlikujejo se odebeljenosti naslovnih textov
* Razlikujejo se upload-file html prikazi, med vsemi tremi so razlike: (Choose file - Chrome, Browse... - Edge in Firefox)
    * Google Chrome - Gumb ima napis "Choose File"
    * Firefox - Gumb ima napis "Browse..." in sledi isto kot Google Chrome
    * Edge - Gumb ima napis isti kot Firefox ampak ima polje za vnos pred gumbom
* Razlikujejo se input-form html prikazi, med vsemi tremi so razlike
    * Google Chrome - Polje za pisanje številk pokaže puščice za večanje in manjšanje šele po tem, ko gremo skozi z miško
    * Firefox - Polje za pisanje številk ima puščice vidne vedno
    * Edge - Nima puščic ampak ima namesto njih opcijo "križec" za brisanje celotnega polja
* Razlikuje se stil drsne vrstice (scroll bar)
    * Google Chrome - lahko smo naredili svoj stil drsne vrstice v css z "-webkit-scrollbar "
    * Edge & Firefox - ne podpirata te funkcije in je drsna vrstica enaka povsod

Dokončali smo LP1 dne 3.11. 2019 - 21:00

## Uporaba zunjanega API vmesnika (Google maps - places) - dodatek k LP1
Uporabili bomo Google Places API, ki nam bo za izbrano lokacijo poiskal restavracije v nekem radiusu.
Dobili bomo lokacijo, ime, naslovno sliko, ikono za restavracijo in oceno, brez cen ali prisotnosti bonov.  
Zaradi izrecnega navodila 'google terms of service' - "delete, obscure, or in any manner alter any brand features, logos, 
__warnings__, notices... or links that appear in the Service or the Content", smo warning za deprecated feature __*open_now*__ 
pustili v konzoli.

# 2. LP

## Veljavni uporabniški vnosi

### [Login.html](FRIFOOD/app_server/views/Login-Register/Login.html)

Vnosno polje kot vnos sprejema epoštni naslov. Dovoljene so male in velike črke, šteilke in znaki *. , _ -*. Vnosno polje ne sme biti prazno, obvezen je znak *@*.

Vnosno polje *geslo* sprejema geslo, ki ne sme biti prazno. Dovoljene so velike in male črke, številke ter znaki.

### [Register.html](FRIFOOD/app_server/views/Login-Register/Register.html)

Vsa vnosna polja morajo biti izpolnjene.

Vnosno polje *ime* ne sme biti prazno sprejema velike in male črke.

Vnosno polje *priimek* ne sme biti prazno sprejema velike in male črke.

Vnosno polje *email naslov* ne sme biti prazno, sprejema velike in male črke, številke in znake . , _ -. Vnosno polje mora imet en znak @.

Vnosni polji *geslo* in *ponovi geslo* sprejemata velike in male črke, številke ter posebne znake.

### Dodajanje in urejanje komentarja na `commentPage`

Ocenjevanje restvracije z zvezdico je obvezno.

Polje za vnos komentarja ne sme biti prazno. Dovoljene so velike in male črke, številke ter znaki.

### Urejanje komentarjev v uporabniškem profilu `/profile`

Polje za urejanje komentarja ne sme biti prazno. Dovoljene so velike in male črke, številke in znaki.

### Urejanje komentarjev v Admin Dashboard `/admin-comments`

Polje za urejanje komentarja ne sme biti prazno. Dovoljene so velike in male črke, številke in znaki.

### Urejanje uporabniških računov v Admin Dashboard `/admin-users`

Vsa polja morajo biti izpolnjena. Polja ime in priimek sprejemata velike in male črke.

Polje email sprejema epoštni račun. Dovoljene so male in velike črke, številke ter znaki . , - _. Obvezen znak je @.

### Dodajanje restavracije `/restaurant-add`

|Ime polja|Obvezno?|Dovoljeni vnosi|
|--|--|--|
|Ime restavracije|Da|Male in velike črke, številke, znaki|
|Lokacija restavracije|Da|Male in velike črke, številke, znaki|
|Kratek opis restavracije|Da|Male in velike črke, številke, znaki|
|Študentsko doplačilo|Ne|Številke|
|Cena malice|Ne|Številke|
|Urnik (ura od do)|Ne|Številke v razponu 0-24|

## Podprte naprave

Aplikacija deluje na vseh **računalnikih** s sistemom Windows, Linux ali macOS, ki podpirajo zadnje aktualne verzije spletnih brskalnikov Chrome (verzija 78 in več), Microsoft Edge (verzija 44 in več) ali Firefox (verzija 71 in več).

Aplikacija deluje na vseh **mobilnih napravah** s sistemom **AndroidOS**, ki podpirajo aktualne verzije spletnih brskalnikov Chrome (verzija 76 in več).

Aplikacije delujejo na **mobilnih napravah** s sistemom **iOS**, ki podpirajo aktualne verzije spletnih brskalnikov Chrome (verzija 76 in več).

# 3. LP: [Heroku spletna aplikacija](https://frifood-2019.herokuapp.com/)

## Namestitev aplikacije v lokalnem okolju
> Navodila v nadaljevanju predvidevajo, da je v lokalnem okolju mogoče izvajati ukaze `npm` in poganjanje podatkovne baze mongoDB.

### Namestitev potrebnih datotek za zagon aplikacije

1. Z ukazom `git clone https://github.com/sp-2019-2020/LP-14.git` v trenutno mapo namestimo datoteke iz oddaljenega repozitorija.
2. Premaknemo se v mapo `.\LP-14\FRIFOOD`
3.  Izvedemo ukaz `npm install` s čemer namestimo potrebne vmesnike za zagon aplikacije.

Dokončali smo LP2&3 dne 9.12. 2019 - 02:45

### Poganjanje aplikacije
4.  V mapi `.\LP-14\FRIFOOD\` izvedemo ukaz `node app.js`. V konzoli dobimo podatek o povezavi na podatkovno bazo.

### Dostop do aplikacije
5. Spletna aplikacija je dostopna na vratih 3000, privzeti naslov za dostop je [localhost:3000](localhost:3000).

# 4. LP


## Namestitev aplikacije v lokalnem okolju
> Navodila v nadaljevanju predvidevajo, da je v lokalnem okolju mogoče izvajati ukaze `npm` in poganjanje podatkovne baze mongoDB.

### Prenos `git` repozitorija
1. Z ukazom `git clone https://github.com/sp-2019-2020/LP-14.git` v trenutno mapo namestimo datoteke iz oddaljenega repozitorija.

ali

1. Uporabimo ukaz `git clone git@github.com:sp-2019-2020/LP-14.git`.

### Dodajanje JWT_GESLO

1. Premaknemo se v mapo `.\LP-14\FRIFOOD`
2. Ustvarimo novo datoteko z imeno `.env`
3. V datoteko `.env` dodatmo spodnjo vsebino

```
JWT_GESLO=IXqvBBSlvJkjC86FHSpT
```

### Namestitev Express strežniškega okolja in MongoDB baze

1. Premaknemo se v mapo `.\LP-14\FRIFOOD`
2.  Izvedemo ukaz `npm install` s čemer namestimo potrebne vmesnike za zagon aplikacije.
3.  Izvedemo ukaz `npm install dotenv --save`
3.  Z ukazom `nodemon` ali `node app.js` zaženemo Express strežnik. V konzoli dobimo podatek o povezavi na podatkovno bazo.

*Podatkovna baza je dostopna na naslovu `localhost:3000`.*

### Namestitev Angular aplikacije

> *Spodnji ukazi veljajo ob predpostavki, da že imamo zagnano streniško okolje Express*

1.  Premaknemo se v mapo `.\LP-14\FRIFOOD\app_public`
2.  Izvedemo ukaz `npm install` s čemer namestimo potrebne vmesnike za zagon aplikacije.
3. Izvedemo ukaz `ng serve --host 0.0.0.0 --port 8081 --disableHostCheck` Angular aplikacija se prevede in zažene.

*Angular aplikacija je dostopna na naslovu `localhost:8081`.*


# 5. LP

## Razlike med vrstami uporabnikov
Spletna aplikacija podpira tri vrste uporabnikov: **gostujočega uporabnika**, **prijavljenega _običajnega uporabnika_** in **administratorja**.

### Gost (neprijavljeni uporabnik)
Gost lahko na spletni aplikaciji:
*   pregleduje seznam vnešenih restvracij, podatke o restavraciji ter komentarje z ocenami
*   uporablja lahko zemljevid ter po njem išče restvarcije vnešene v sistemu in ostale (prek Google API)
*   išče prek vgrajenega isklanega mehanizma po imenu restavracij, ki so vnesene v sistemu

### Prijavljeni uporabnik (Običajni uporabnik)
Prijavljeni uporabnik lahko na spletni aplikcaiji:
*   vse, kar lahko počne gost (neprijavljeni uporabnik)
*   pregleduje svoje aktivnosti in podatke o svoje profilu (`/profile`)
*   dodaja komentarje in ocenjuje aplikacije
*   svoje komentarje lahko ureja in briše
*   dodaja lahko nove restavracije

### Administrator sistema
Administrator lahko na spletni aplikaciji:
*   vse, kar lahko prijavljeni uporabnik
*   dostopa do Administratorskega pogleda (`/admin/*`)
*   briše v sistem dodane restavracije (`/admin/locations`)
*   pregleduje in ureja registrirane uporabnike (`/admin/users`)
*   briše vse objavljene ocene in komentarje (`/admin/comments`)
*   dostopa do analitike strani (`/admin/analytics`)

## Čas nalaganja strani
### Specifikacija testnega sistema
|||
|---|---|
|CPU|Core i7-8705G|
|RAM|16,00GB|
|OS|Windows 10 Pro 64-bit|
|način postavitve|lokalno|

### Brave (osnovan na Chromium)
#### Začetno nalaganje aplikacije
> Začetno izvajanje se je izvajalo na osnovni strani `/`

Začetno nalaganje aplikacije je skupaj trajalo **5,85 sekund**, pri tem se je skupaj preneslo **8,5MB** ter opravilo **38 zahtev**.

V tabeli se nahaja 10 datotek, ki so potrebovale največ časa za prenos:
|Ime datoteke|Čas (v ms)|
|---|---|
|začetna poizvedba na spletno stran|305|
|Google Analitika JS datoteka|218|
|`vendor.js`|213|
|Google Maps API|173|
|Material Icons knjižnica|139|
|`jquery-3.3.1.slim.min.js`|130|
|`common.js`|128|
|Roboto font knjižnica|126|
|`all.css`|124|
|`scripts.js`|123|
|`util.js`|115|

#### Nadaljno nalaganje strani

|Stran|Število zahtevkov|Skupen čas nalaganja (ms)|
|---|---|---|
|Začetna stran `/`|2|12|
|Pregled restavracij `/restaurant-list`|49|496|
|Več o restavraciji `/restaurantView/...`|3|26|
|Komentarji restavracije `/commentPage/...`|12|449|
|Prijava `/login`|2|17|
|Prijava uporabnika|11|116|
|Ogled profila `/profile`|2|383|
|Admin Dashboard Lokacije|2|22|
|Admin Dashboard Komentarji|3|109|
|Admin Dashboard Uporabniki|1|9|
|Urejanje uporabnika|1|16|
|Admin Dashboard Analitika|1|8|
|Dodajanje nove restavracije|3|325|

Največ časa za nalaganje potrebuje Seznam restvracij, saj, poleg prenosa podatkov o vseh restavracijah iz baze, za svoje delovanje uporablja zunanji Google API (Google Maps).

### Mozzila Firefox
#### Začetno nalaganje aplikacije
> Začetno izvajanje se je izvajalo na osnovni strani `/`

Začetno nalaganje aplikacije je skupaj trajalo **5,90 sekund**, pri tem se je skupaj preneslo **8,96MB** ter opravilo **39 zahtev**.


#### Nadaljno nalaganje strani

|Stran|Število zahtevkov|Skupen čas nalaganja (ms)|
|---|---|---|
|Začetna stran `/`|2|12|
|Pregled restavracij `/restaurant-list`|26|780|
|Več o restavraciji `/restaurantView/...`|2|46|
|Komentarji restavracije `/commentPage/...`|9|86|
|Prijava `/login`|2|10|
|Prijava uporabnika|11|225|
|Ogled profila `/profile`|5|173|
|Admin Dashboard Lokacije|2|10|
|Admin Dashboard Komentarji|3|49|
|Admin Dashboard Uporabniki|1|8|
|Urejanje uporabnika|1|5|
|Admin Dashboard Analitika|1|7|
|Dodajanje nove restavracije|3|11|

Največ časa za nalaganje potrebuje Seznam restvracij, saj, poleg prenosa podatkov o vseh restavracijah iz baze, za svoje delovanje uporablja zunanji Google API (Google Maps).

## Spremljanje uporabe aplikacije

### GTag
```javascript
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-156003548-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-156003548-1');
</script>
```

### [Poročilo o uporabi](docs/GoogleAnalitika/analitika.pdf)

## Test obremenitve
### Specifikacija testnega sistema
|||
|---|---|
|CPU|Core i7-4710HQ|
|RAM|8,00GB|
|OS|Windows 10 Pro 64-bit|
|način postavitve|lokalno|

### Specifikacija testa
Pognanih je bilo 4989 poizvedb (uporabnikov), z razmikom 1.
Loop count je bil nastavljen na 1, ker smo test želeli pognati le enkrat.

### [Rezultati testa](FRIFOOD/test/JMeter/Results.csv)
Strežnik se je sesul pri 4398. poizvedbi.

## Varnostni pregled
### [Začetno poročilo](FRIFOOD/test/security/pre-fix-zap.html)
### [Končno poročilo](FRIFOOD/test/security/post-fix-zap.html)
### Ignorirane napake
#### `Ignore: Absence of Anti-CSRF Tokens.`

CSRF je način napada, kjer avtentikacija poteka z piškotki.

**Primer napada:**
Jaz pošljem nekomu `GET: https://nekastoritev/izbrisi-racun`, ta nekdo odpre link in račun je izbrisan avtomatsko.

**Kako preprečiti?**
Preveri se, da je uporabnik res naložil najprej spletno stran za izbris in šele potem kliknil na gumb z akcijo GET https://nekastoritev/izbrisi-racun.
To se naredi tako, da se ob generiranju forma za izbris pošlje zraven še token, ki se ga doda requestu.

**Zakaj napako ignoriramo?**
Vsak request se ročno avtenticira tako da se doda header Authorization: Bearer, torej s takšnim trikom uporabnika ne moreš dodati njegovega tokena v request.

#### `Ignore: Cross-Domain JavaScript Source File Inclusion`
Napaka se pojavi ob uporabi javascript datotek iz zunanjih virov, v našem primeru je to zunanji API, ki ga uporabljamo - Google Maps API.

#### `Ignore: Content-Type Header Missing`
Napaka se pojavi ob napačno/nepravilno določenih glavah zunanjih storitev.

#### `Ignore: Application Error Disclosure`
Gre za *false positive* napako, ki jo javlja program.

#### `Alert: CSP Scanner: Wildcard Directive`
Rešitev je bila implementirana v `app.js`, gre za *false positive*:
```javascript
const csp = require('express-csp-header');
		app.use(csp({
  		policies: {
    		'default-src': [csp.SELF],
  		  'script-src': [csp.SELF, csp.INLINE, 'somehost.com'],
  		  'style-src': [csp.SELF, 'mystyles.net'],
  		  'img-src': ['data:', 'images.com'],
 		   'worker-src': [csp.NONE],
  		  'block-all-mixed-content': true
 		 }
        }));
```

#### `Alert: X-Frame-Options Header Not Set, X-Content-Type-Options Header Missing, Web Browser XSS Protection Not Enabled`

Rešitev je bila implementirana v `app.js`, gre za *false positive*:
```javascript
// Odprava varnostnih pomanjkljivosti
		app.disable('x-powered-by');
		app.use((req, res, next) => {
		  res.header('X-Frame-Options', 'DENY');
		  res.setHeader('X-XSS-Protection', '1; mode=block');
		  res.setHeader('X-Content-Type-Options', 'nosniff');
		  next();
		});
```

## Test funkcionalnosti
### [Scenarij](FRIFOOD/test/FriFood.test.js)
### [Poročilo](FRIFOOD/test/porocilo/porocilo.html)

## Analiza na google analytics
https://analytics.google.com/analytics/web/
