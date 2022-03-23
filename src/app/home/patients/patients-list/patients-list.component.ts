import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from '../patient.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[] = [];
  patientsSub: Subscription = new Subscription;

  constructor(private patientSerivce: PatientsService) { }
  
  ngOnInit(): void {
    this.patientsSub = this.patientSerivce.getPatients()
      .subscribe(
        (patients: Patient[]) => {
          this.patients = patients;
          console.log(this.patients); 
        }
      );
  }

  ngOnDestroy(): void {
    this.patientsSub.unsubscribe();
  }
  

}
