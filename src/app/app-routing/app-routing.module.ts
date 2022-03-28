import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from '../home/patients/patients.component';
import { DoctorsComponent } from '../home/doctors/doctors.component';
import { VisitsComponent } from '../home/visits/visits.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { PatientsListComponent } from '../home/patients/patients-list/patients-list.component';
import { PatientAddFormComponent } from '../home/patients/patient-add-form/patient-add-form.component';
import { DoctorsListComponent } from '../home/doctors/doctors-list/doctors-list.component';
import { DoctorAddFormComponent } from '../home/doctors/doctor-add-form/doctor-add-form.component';
import { IncomingVisitsListComponent } from '../home/visits/incoming-visits-list/incoming-visits-list.component';
import { EndedVisitsListComponent } from '../home/visits/ended-visits-list/ended-visits-list.component';
import { AddVisitFormComponent } from '../home/visits/add-visit-form/add-visit-form.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'pacjenci', component: PatientsComponent, children: [
      {path: '', redirectTo: 'lista', pathMatch: 'full'},
      {path: 'lista', component: PatientsListComponent},
      {path: 'dodaj', component: PatientAddFormComponent}
    ]},
    {path: 'lekarze', component: DoctorsComponent, children: [
      {path: '', redirectTo: 'lista', pathMatch: 'full'},
      {path: 'lista', component: DoctorsListComponent},
      {path: 'dodaj', component: DoctorAddFormComponent}
    ]},
    {path: 'wizyty', component: VisitsComponent, children: [
      {path: '', redirectTo: 'nadchodzace', pathMatch: 'full'},
      {path: 'nadchodzace', component: IncomingVisitsListComponent},
      {path: 'zakonczone', component: EndedVisitsListComponent},
      {path: 'dodaj', component: AddVisitFormComponent}
    ]}
  ]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {

}
