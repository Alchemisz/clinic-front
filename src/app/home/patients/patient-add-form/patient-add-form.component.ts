import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { PatientsService } from '../patients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-add-form',
  templateUrl: './patient-add-form.component.html',
  styleUrls: ['./patient-add-form.component.css'],
})
export class PatientAddFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('formRef')
  patientForm!: NgForm;
  peselSub!: Subscription;

  constructor(private patientService: PatientsService) {}

  ngOnDestroy(): void {
    this.peselSub.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.peselSub = this.patientService.pesel.subscribe((pesel) => {
      this.patientForm.form.patchValue({
        pesel: pesel,
      });
    });
  }

  ngOnInit(): void {}

  onFormSubmit(formRef: NgForm) {
    let createPatientCommand = {
      username: formRef.value['username'],
      password: formRef.value['password'],
      firstName: formRef.value['firstName'],
      lastName: formRef.value['lastName'],
      pesel: formRef.value['pesel'],
      address: {
        postCode: formRef.value['postCode'],
        city: formRef.value['city'],
        houseNumber: formRef.value['homeNumber'],
      },
    };
    this.patientService.addPatient(createPatientCommand);
    this.patientForm.form.reset();
  }

  generatePesel(): void {
    this.patientService.generatePesel({
      dateOfBirth: this.patientForm.value['dateOfBirth'],
    });
  }

  generatePassword(): void {
    this.patientForm.form.patchValue({
      // password: this.patientService.generatePassword()
      password: 'X98af5TZY',
    });
  }
}
