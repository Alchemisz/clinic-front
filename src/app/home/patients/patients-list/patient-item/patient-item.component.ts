import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../patient.model';
import { PatientsService } from '../../patients.service';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.css']
})
export class PatientItemComponent implements OnInit {

  @Input()
  patient!: Patient;

  constructor(private patientSerice: PatientsService){}

  ngOnInit(): void {
  }

  deletePatient(pesel: string){
    if(confirm("Na pewno chcesz usunąć pacjenta o numerze pesel: " + pesel)) {
      this.patientSerice.deleteByPesel(pesel);
    }
  }
}
