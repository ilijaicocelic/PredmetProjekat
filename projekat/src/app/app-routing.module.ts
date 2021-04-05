import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './componente/profile/profile.component';
import { FriendsComponent } from './componente/friends/friends.component';
import { AirlineComponent } from './componente/airlane/airline/airline.component';
import { StartingPageComponent } from './componente/starting-page/starting-page/starting-page.component'
import { SignInComponent } from './componente/sign-in/sign-in/sign-in.component';
import { SignUpComponent } from './componente/sign-up/sign-up/sign-up.component';
import {  RentACarComponent } from './componente/rent-a-car/rent-a-car/rent-a-car.component';
import { AirlineFilteredComponent } from './componente/airline-table/airline-filtered.component';
import { RentACarFilteredComponent} from './componente/rent-a-car-filtered/rent-a-car-filtered/rent-a-car-filtered.component';
import { pathToFileURL } from 'url';


import {PageNotFoundComponent} from './componente/page-not-found/page-not-found/page-not-found.component'
import {RentCarDescriptionComponent} from './componente/rent-car-description/rent-car-description/rent-car-description.component';

import { AddRcServisComponent} from './componente/add-rc-servis/add-rc-servis/add-rc-servis.component';
import { AddAirlineComponent} from './componente/add-airline/add-airline/add-airline.component';
import { SeatReservationComponent } from './componente/seat-reservation/seat-reservation.component';
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
import { RegistredGuardGuard } from './guards/registred-guard.guard';
import { SuperAdminGuardGuard } from './guards/super-admin-guard.guard';
import { CarAdminGuardGuard } from './guards/car-admin--guard.guard';
import { AirlineAdminGuardGuard } from './guards/airline-admin--guard.guard';
import { UnregistredGuardGuard } from './guards/unregistred-guard.guard';
import { ProfileComponentGuard } from './guards/profile-component.guard';
import { FastCarReservationsComponent } from './componente/fast-car-reservations/fast-car-reservations.component';
import { FastCarResListComponent } from './componente/fast-car-res-list/fast-car-res-list.component';



const routes: Routes = [
  {
    path: "",
    component: StartingPageComponent,  canActivate: [UnregistredGuardGuard]
  },


 // { path: "", component: RegisteredUserComponent }, //Suvisna komponenta
  

 
  //Rute kojima meze pristupiti neregistrovani korisnik ( Ovaj gard omogucava i pristup Registrovanom Obicnom korisniku)
  {path: "sign-in", component: SignInComponent,canActivate: [UnregistredGuardGuard]},
  {path: "sign-up", component: SignUpComponent,canActivate: [UnregistredGuardGuard]},
  { path: "rent-a-car-table", component: RentACarFilteredComponent ,  canActivate: [UnregistredGuardGuard]},
  { path: "airline-table", component: AirlineFilteredComponent , canActivate: [UnregistredGuardGuard]},  
  { path: "airline",canActivate: [UnregistredGuardGuard],
    children:[
      {path: "" , component: AirlineComponent},
      {path: ":flightID" , component: SeatReservationComponent}
    ]
  },
  { path: "rent-a-car", component: RentACarComponent, canActivate: [UnregistredGuardGuard]},
  
  { path: "airDest",  canActivate: [UnregistredGuardGuard],
    children:[
      {path: ":idAir" , component:  AirlineDestinationsComponent}
    ]
  },
  { path: "rentcDesc", canActivate: [UnregistredGuardGuard],
    children:[
      {path: ":idRC" , component:   RentCarDescriptionComponent}
    ]
  },
  { path: "rentCarDest", canActivate: [UnregistredGuardGuard],
    children:[
      {path: ":idRC" , component:  RentCarBranchComponent}
    ]
  },


  //Rute kojima sme pristupiti samo registrovani obican korisnik
  { path: "friends", component: FriendsComponent, canActivate: [RegistredGuardGuard] },
  { path: "history-of-reservation", component: HistoryOfReservationComponent, canActivate: [RegistredGuardGuard]},
  { path: "fast-car-res", component: FastCarResListComponent, canActivate: [RegistredGuardGuard] },

  
  //Ovim rutama moze pristupiti samo Airlineadmin
  { path: "myFlightList", component: MyFlightListComponent, canActivate: [AirlineAdminGuardGuard]},
  { path: "admin-add-flight", component: AdminAddFlightComponent,canActivate: [AirlineAdminGuardGuard]},
  { path: "myAirLineService",canActivate: [AirlineAdminGuardGuard],
    children:[
    { path: "", component: MyAirlineServisComponent},
    ]
  },

  //Ovim rutama moze pristupiti samo CARadmin
  { path: "myRCservis", canActivate: [CarAdminGuardGuard],
    children:[
      { path: "", component: MyRcServisComponent},
    ]
  },
  { path: "admin-add-car", canActivate: [CarAdminGuardGuard],
  children:[
    { path: "", component: AdminAddCarComponent},
    { path: ":id",component: AdminAddCarComponent},
    ]

},
  { path: "myCarList", component: MyCarListComponent , canActivate: [CarAdminGuardGuard]},

  //Ovim rutama moze pristupiti samo glavni admin
  { path: "all-rc-servis",component: ListOfCarCompaniesComponent, canActivate: [SuperAdminGuardGuard]},
  { path: "all-airline",component: ListOfAirlinesComponent, canActivate: [SuperAdminGuardGuard]},
  { path: "add-airline",component: AddAirlineComponent, canActivate: [SuperAdminGuardGuard]},
  { path: "add-rcServis",component: AddRcServisComponent, canActivate: [SuperAdminGuardGuard]},
  { path : "fast-car-reservation/:id",component : FastCarReservationsComponent,canActivate: [CarAdminGuardGuard]},
  //Profilu pristupaju svi registrovani korisnici
  { path: "profile", component: ProfileComponent , canActivate: [ProfileComponentGuard] }, 

  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
