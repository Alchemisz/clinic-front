import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-add-form',
  templateUrl: './patient-add-form.component.html',
  styleUrls: ['./patient-add-form.component.css']
})
export class PatientAddFormComponent implements OnInit {

  @ViewChild('formRef')
  patientForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onFormSubmit(formRef: NgForm){
    this.patientForm.form.removeControl('dateOfBirth');
    console.log(formRef.value);
  }

  generatePesel(): void{
    this.patientForm.form.patchValue({
      pesel: '99112233654',
    })
  }

}
