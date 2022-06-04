import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Patient } from '../patient.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  patient!: Patient;
  routeSub!: Subscription;
  patientSub!: Subscription;

  isEditMode: boolean = false;

  @ViewChild('formRef')
  patientForm!: NgForm;

  constructor(
    private patientsSerivce: PatientsService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.patientSub = this.patientsSerivce.patient.subscribe((patient) => {
      this.patient = patient;

      this.fillPatientForm(patient);
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.patientsSerivce.getPatientByPesel(params['id']);
    });
  }

  turnOnEditMode() {
    this.isEditMode = true;
  }

  onFormSubmit(formRef: NgForm) {
    this.isEditMode = false;
    console.log(formRef.control.value);
    this.patientsSerivce.updatePatient(formRef.control.value);
  }

  ngOnDestroy(): void {
    this.patientSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  private fillPatientForm(patient: Patient) {
    this.patientForm.control.patchValue({
      pesel: patient.pesel,
      firstName: patient.firstName,
      lastName: patient.lastName,
      postCode: patient.address.postCode,
      city: patient.address.city,
      homeNumber: patient.address.houseNumber,
    });
  }
}
