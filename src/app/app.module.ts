import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { NavMenuComponent } from './home/nav-menu/nav-menu.component';
import { PatientsComponent } from './home/patients/patients.component';
import { DoctorsComponent } from './home/doctors/doctors.component';
import { VisitsComponent } from './home/visits/visits.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientsListComponent } from './home/patients/patients-list/patients-list.component';
import { PatientItemComponent } from './home/patients/patients-list/patient-item/patient-item.component';
import { PatientsNavMenuComponent } from './home/patients/patients-nav-menu/patients-nav-menu.component';
import { PatientAddFormComponent } from './home/patients/patient-add-form/patient-add-form.component';
import { FormsModule } from '@angular/forms';
import { DoctorNavMenuComponent } from './home/doctors/doctor-nav-menu/doctor-nav-menu.component';
import { DoctorsListComponent } from './home/doctors/doctors-list/doctors-list.component';
import { DoctorAddFormComponent } from './home/doctors/doctor-add-form/doctor-add-form.component';
import { IncomingVisitsListComponent } from './home/visits/incoming-visits-list/incoming-visits-list.component';
import { EndedVisitsListComponent } from './home/visits/ended-visits-list/ended-visits-list.component';
import { AddVisitFormComponent } from './home/visits/add-visit-form/add-visit-form.component';
import { VisitNavMenuComponent } from './home/visits/visit-nav-menu/visit-nav-menu.component';
import { SpinnerLoaderComponent } from './shared/spinner-loader/spinner-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PatientsComponent,
    DoctorsComponent,
    VisitsComponent,
    HomeComponent,
    LoginComponent,
    PatientsListComponent,
    PatientItemComponent,
    PatientsNavMenuComponent,
    PatientAddFormComponent,
    DoctorNavMenuComponent,
    DoctorsListComponent,
    DoctorAddFormComponent,
    IncomingVisitsListComponent,
    EndedVisitsListComponent,
    AddVisitFormComponent,
    VisitNavMenuComponent,
    SpinnerLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
