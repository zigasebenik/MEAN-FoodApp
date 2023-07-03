import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppUsmerjanjeModule } from './modules/app-usmerjanje/app-usmerjanje.module';

import { AppComponent } from './app.component';
import { OgrodjeComponent } from './components/ogrodje/ogrodje.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CommentpageComponent } from './components/commentpage/commentpage.component';
import { RestaurantviewComponent } from './components/restaurantview/restaurantview.component';
import { CommentComponent } from './components/commentpage/comment/comment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModalBackdrop} from "@ng-bootstrap/ng-bootstrap/modal/modal-backdrop";
import {NgbModalModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import { GetDateFromDBFormatPipe } from './pipes/change-date.pipe';
import { GetTimeFromDBFormatPipe } from './pipes/get-time-from-dbformat.pipe';
import { RestaurantaddComponent } from './components/restaurantadd/restaurantadd.component';
import { ZvezdiceComponent } from './components/zvezdice/zvezdice.component';
import {UserProfileComponent} from "./components/userProfile/userProfile.component";
import { FileUploadModule } from 'ng2-file-upload';
import { RestaurantlistComponent } from './components/restaurantlist/restaurantlist.component';
import {AdminLocationsComponent} from "./components/adminDashboard/locations/adminLocations.component";
import { TransformLinkPipe } from './pipes/transform-link.pipe';
import { AdminPanelComponent } from './components/adminDashboard/admin-panel/admin-panel.component';
import { AdminCommentsComponent } from './components/adminDashboard/comments/admin-comments.component';
import { AdminUsersComponent } from './components/adminDashboard/users/admin-users.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ModalComponentComponent as ModalComponentComponent } from './components/modal-component/modal-component.component';
import { MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransformLink2Pipe } from './pipes/transform-link2.pipe';
import { ZgodovinaPipePipe } from './pipes/zgodovina-pipe.pipe';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import {CommentModalComponent} from "./components/adminDashboard/comments/comment-modal/comment-modal.component";
import { EditUserComponent } from './components/adminDashboard/users/edit-user/edit-user.component';
import { AnalyticsComponent } from './components/adminDashboard/analytics/analytics/analytics.component';
import {ChartsModule} from "ng2-charts";
import { ModalPogojiComponent } from './components/modal-pogoji/modal-pogoji.component';

@NgModule({
  declarations: [
    AppComponent,
    OgrodjeComponent,
    FrontpageComponent,
    RegisterComponent,
    LoginComponent,
    CommentpageComponent,
    RestaurantviewComponent,
    CommentComponent,
    UserProfileComponent,
    AdminLocationsComponent,
    GetDateFromDBFormatPipe,
    GetTimeFromDBFormatPipe,
    RestaurantaddComponent,
    ZvezdiceComponent,
    RestaurantlistComponent,
    TransformLinkPipe,
    AdminPanelComponent,
    AdminCommentsComponent,
    AdminUsersComponent,
    LogoutComponent,
    ModalComponentComponent,
    TransformLink2Pipe,
    ZgodovinaPipePipe,
    ModalPopupComponent,
    CommentModalComponent,
    EditUserComponent,
    AnalyticsComponent,
    ModalPogojiComponent
  ],
  exports: [
    ZgodovinaPipePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppUsmerjanjeModule,
    NgbModule,
    NgbModalModule,
    FileUploadModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    ChartsModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
    ZgodovinaPipePipe
  ],
  bootstrap: [OgrodjeComponent],
  entryComponents: [ModalComponentComponent, ModalPopupComponent, ModalPogojiComponent]
})
export class AppModule { }
