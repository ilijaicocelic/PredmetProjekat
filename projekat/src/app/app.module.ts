import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule}from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog'; 
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './componente/nav-menu/nav-menu/nav-menu.component';
import { SignInComponent } from './componente/sign-in/sign-in/sign-in.component';

import { StartingPageComponent } from './componente/starting-page/starting-page/starting-page.component';
import { FriendsComponent } from './componente/friends/friends.component';
import { AirlineComponent } from './componente/airlane/airline/airline.component';
import { RentACarComponent } from './componente/rent-a-car/rent-a-car/rent-a-car.component';
import { AirlineFilteredComponent } from './componente/airline-table/airline-filtered.component';
import { RentACarFilteredComponent } from './componente/rent-a-car-filtered/rent-a-car-filtered/rent-a-car-filtered.component';
import { SignUpComponent} from './componente/sign-up/sign-up/sign-up.component';
import { from } from 'rxjs';
import { RegisteredUserComponent } from './componente/registered-user/registered-user.component';

import { ProfileComponent } from './componente/profile/profile.component';


import { PageNotFoundComponent } from './componente/page-not-found/page-not-found/page-not-found.component';
import { RentCarDescriptionComponent } from './componente/rent-car-description/rent-car-description/rent-car-description.component';

import { FlyghtsTableComponent } from './componente/flyghts-table/flyghts-table.component';
import { CarTableComponent } from './componente/car-table/car-table/car-table.component';
import { AddAirlineComponent } from './componente/add-airline/add-airline/add-airline.component';
import { AddRcServisComponent } from './componente/add-rc-servis/add-rc-servis/add-rc-servis.component';
import { SeatReservationComponent } from './componente/seat-reservation/seat-reservation.component';
import { ReservedSeatDialogComponent } from './componente/reserved-seat-dialog/reserved-seat-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HistoryOfReservationComponent } from './componente/history-of-reservation/history-of-reservation.component';
import { AirlineDestinationsComponent } from './componente/airline-destinations/airline-destinations/airline-destinations.component';
import { RentCarBranchComponent } from './componente/rent-car-branch/rent-car-branch/rent-car-branch.component';
import { MyRcServisComponent } from './componente/my-rc-servis/my-rc-servis/my-rc-servis.component';
import { MyCarListComponent } from './componente/my-car-list/my-car-list/my-car-list.component';

import { MyAirlineServisComponent } from './componente/my-airline-servis/my-airline-servis.component';
import { MyFlightListComponent } from './componente/my-flight-list/my-flight-list.component';
import { ListOfAirlinesComponent } from './componente/list-of-airlines/list-of-airlines.component';
import { ListOfCarCompaniesComponent } from './componente/list-of-car-companies/list-of-car-companies.component';
import { AdminAddCarComponent } from './componente/admin-add-car/admin-add-car.component';
import { AdminAddFlightComponent } from './componente/admin-add-flight/admin-add-flight.component';
import { ChangeFlightComponent } from './componente/change-flight/change-flight.component';
import { ReservationCarDialogComponent } from './componente/reservation-car-dialog/reservation-car-dialog.component';
import { AuthInterceptor } from './componente/auth/auth.interceptor';
import { TokenInterceptor } from './componente/auth/tokenInterceptor';
import { UserService } from './services/user-service/user.service';
import { SocialLoginModule,SocialAuthServiceConfig  } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';
import { RentCarService } from './services/rent-a-car-service/rent-a-car-service';
import { AirlineService } from './services/airline-service/airline.service';
import { RatingModule } from 'ng-starrating';
import { FirstLoginDialogComponent } from './componente/first-login-dialog/first-login-dialog.component';
import { FastCarReservationsComponent } from './componente/fast-car-reservations/fast-car-reservations.component';
import { FastCarResListComponent } from './componente/fast-car-res-list/fast-car-res-list.component';


// let config = new  SocialAuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("581918260318-f6jffpfs44bg56brtn48r5j3g9icuihg.apps.googleusercontent.com")
//   },
  
// ]);
 
// export function provideConfig() {
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SignInComponent,
    SignUpComponent,
    StartingPageComponent,
    FriendsComponent,
    AirlineComponent,
    RentACarComponent,
    AirlineFilteredComponent,
    RentACarFilteredComponent,
    RegisteredUserComponent,
    ProfileComponent,
    PageNotFoundComponent,
    RentCarDescriptionComponent,
    FlyghtsTableComponent,
    CarTableComponent,
    AddAirlineComponent,
    AddRcServisComponent,
    SeatReservationComponent,
    ReservedSeatDialogComponent,
    HistoryOfReservationComponent,
    AirlineDestinationsComponent,
    RentCarBranchComponent,
    MyRcServisComponent,
    MyCarListComponent,
    MyAirlineServisComponent,
    MyFlightListComponent,
    ListOfAirlinesComponent,
    ListOfCarCompaniesComponent,
    AdminAddCarComponent,
    AdminAddFlightComponent,
    ChangeFlightComponent,
    ReservationCarDialogComponent,
    FirstLoginDialogComponent,
    FastCarReservationsComponent,
    FastCarResListComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    RatingModule 
   

  ],
  entryComponents:[
    ReservedSeatDialogComponent
  ],
  providers: [
    CookieService,
    UserService,
    RentCarService,
    AirlineService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
   {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "581918260318-f6jffpfs44bg56brtn48r5j3g9icuihg.apps.googleusercontent.com"
            ),
          },
        
      
        ],
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
