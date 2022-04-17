import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientsService } from '../patients.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-add-form',
  templateUrl: './patient-add-form.component.html',
  styleUrls: ['./patient-add-form.component.css']
})
export class PatientAddFormComponent implements OnInit {

  @ViewChild('formRef')
  patientForm!: NgForm;

  constructor(
    private patientService: PatientsService,
    private _snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 2000
    });
  }


  onFormSubmit(formRef: NgForm){
    this.patientForm.form.removeControl('dateOfBirth');
    this.openSnackBar("Dodano pacjenta!", "Zamknij");
    console.log(formRef.value);
  }

  generatePesel(): void{
    this.patientForm.form.patchValue({
      // pesel: this.patientService.generatePesel()
      pesel: '99112233654',
    }) 
  }

  generatePassword(): void{
    this.patientForm.form.patchValue({
      // password: this.patientService.generatePassword()
      password: 'X98af5TZY',
    }) 
  }

}
