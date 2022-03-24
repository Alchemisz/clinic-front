import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from '../home/patients/patients.component';
import { DoctorsComponent } from '../home/doctors/doctors.component';
import { VisitsComponent } from '../home/visits/visits.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { PatientsListComponent } from '../home/patients/patients-list/patients-list.component';
import { PatientAddFormComponent } from '../home/patients/patient-add-form/patient-add-form.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'pacjeci', component: PatientsComponent, children: [
      {path: 'lista', component: PatientsListComponent},
      {path: 'dodaj', component: PatientAddFormComponent}
    ]},
    {path: 'lekarze', component: DoctorsComponent},
    {path: 'wizyty', component: VisitsComponent}
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
