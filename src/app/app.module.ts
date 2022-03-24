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
    PatientAddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
