import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../patient.model';
import { PatientsService } from '../../patients.service';

@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.css'],
})
export class PatientItemComponent implements OnInit {
  @Input()
  patient!: Patient;

  constructor(
    private patientSerice: PatientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  deletePatient(pesel: string) {
    if (confirm('Na pewno chcesz usunąć pacjenta o numerze pesel: ' + pesel)) {
      this.patientSerice.deleteByPesel(pesel);
    }
  }

  showDetails(pesel: string) {
    this.router.navigate(['../szczegoly', pesel], { relativeTo: this.route });
  }
}
