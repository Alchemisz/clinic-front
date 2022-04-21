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
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.patientSub = this.patientsSerivce.patient.subscribe((patient) => {
      this.patient = patient;

      this.fillPatientForm(patient);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
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
    this.openSnackBar('Dane pacjenta zostały edytowane!', 'Zamknij');
    //TU DODAĆ EDYCJE DANYCH PACJENTA
    console.log(formRef.control.value);
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
      username: 'TU RZEBA DODAĆ',
      postCode: patient.address.postCode,
      city: patient.address.city,
      homeNumber: patient.address.houseNumber,
    });
  }
}
