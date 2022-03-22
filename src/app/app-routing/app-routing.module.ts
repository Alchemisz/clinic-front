import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from '../patients/patients.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { VisitsComponent } from '../visits/visits.component';

const appRoutes: Routes = [
  {path: '', component: PatientsComponent},
  {path: 'pacjeci', component: PatientsComponent},
  {path: 'lekarze', component: DoctorsComponent},
  {path: 'wizyty', component: VisitsComponent}
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
