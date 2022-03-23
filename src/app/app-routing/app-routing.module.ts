import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from '../patients/patients.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { VisitsComponent } from '../visits/visits.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'pacjeci', component: PatientsComponent},
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
