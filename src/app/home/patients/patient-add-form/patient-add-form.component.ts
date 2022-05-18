import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { PatientsService } from '../patients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-patient-add-form',
  templateUrl: './patient-add-form.component.html',
  styleUrls: ['./patient-add-form.component.css'],
})
export class PatientAddFormComponent implements OnInit {
  @ViewChild('formRef')
  patientForm!: NgForm;

  constructor(private patientService: PatientsService) {}

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
    this.patientForm.form.patchValue({
      // pesel: this.patientService.generatePesel()
      pesel: '99112233654',
    });
  }

  generatePassword(): void {
    this.patientForm.form.patchValue({
      // password: this.patientService.generatePassword()
      password: 'X98af5TZY',
    });
  }
}
