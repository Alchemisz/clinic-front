import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { EndedVisitsListComponent } from './home/visits/ended-visits-list/ended-visits-list.component';
import { AddVisitFormComponent } from './home/visits/add-visit-form/add-visit-form.component';
import { VisitNavMenuComponent } from './home/visits/visit-nav-menu/visit-nav-menu.component';
import { SpinnerLoaderComponent } from './shared/spinner-loader/spinner-loader.component';
import { DoctorItemComponent } from './home/doctors/doctors-list/doctor-item/doctor-item.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AccountInfoFormComponent } from './home/account/account-info-form/account-info-form.component';
import { AccountComponent } from './home/account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UpcomingVisitsListComponent } from './home/visits/upcoming-visits-list/upcoming-visits-list.component';
import { VisitListItemComponent } from './home/visits/visit-list-item/visit-list-item.component';
import { DatePipe } from '@angular/common';
import { PatientDetailsComponent } from './home/patients/patient-details/patient-details.component';

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
    EndedVisitsListComponent,
    AddVisitFormComponent,
    VisitNavMenuComponent,
    SpinnerLoaderComponent,
    DoctorItemComponent,
    AccountInfoFormComponent,
    AccountComponent,
    UpcomingVisitsListComponent,
    VisitListItemComponent,
    PatientDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    MatSnackBar,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
