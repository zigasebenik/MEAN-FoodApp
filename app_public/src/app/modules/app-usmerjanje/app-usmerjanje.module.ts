import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FrontpageComponent } from '../../components/frontpage/frontpage.component';
import { RegisterComponent } from '../../components/register/register.component';
import { LoginComponent } from '../../components/login/login.component';
import { CommentpageComponent } from '../../components/commentpage/commentpage.component';
import { RestaurantviewComponent } from '../../components/restaurantview/restaurantview.component';
import { RestaurantaddComponent} from "../../components/restaurantadd/restaurantadd.component";
import {UserProfileComponent} from "../../components/userProfile/userProfile.component";
import {RestaurantlistComponent} from "../../components/restaurantlist/restaurantlist.component";
import {AdminLocationsComponent} from "../../components/adminDashboard/locations/adminLocations.component";
import {AdminCommentsComponent} from "../../components/adminDashboard/comments/admin-comments.component";
import {AdminUsersComponent} from "../../components/adminDashboard/users/admin-users.component";
import {LogoutComponent} from "../../components/logout/logout.component";
import {EditUserComponent} from "../../components/adminDashboard/users/edit-user/edit-user.component";
import {AnalyticsComponent} from "../../components/adminDashboard/analytics/analytics/analytics.component";
import {ChartsModule} from "ng2-charts";


const poti: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  { path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'commentPage/:id/:page',
    component: CommentpageComponent
  },
  {
    path: 'restaurantView/:id',
    component: RestaurantviewComponent
  },
  {
    path: '',
    component: FrontpageComponent
  },
  {
    path: 'restaurant-add',
    component: RestaurantaddComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'admin/locations',
    component: AdminLocationsComponent
  },
  {
    path: 'admin/comments',
    component: AdminCommentsComponent
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent
  },
  {
    path: 'admin/analytics',
    component: AnalyticsComponent
  },
  {
    path: 'restaurant-list',
    component: RestaurantlistComponent
  },
  {
    path: 'restaurant-list/:searchVal',
    component: RestaurantlistComponent
  },
  {
    path: 'admin/user/:id',
    component: EditUserComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(poti),
    ChartsModule
  ],
  exports: [RouterModule]
})
export class AppUsmerjanjeModule { }
