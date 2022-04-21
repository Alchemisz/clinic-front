import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../doctors.service';
import { Doctor } from '../model/doctor.model';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
})
export class DoctorDetailsComponent implements OnInit, AfterViewInit {
  doctorSub!: Subscription;
  routeSub!: Subscription;
  doctor!: Doctor;
  isEditMode: boolean = false;
  specializations!: { id: number; name: string }[];

  @ViewChild('formRef')
  doctorForm!: NgForm;

  constructor(
    private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngAfterViewInit(): void {
    this.doctorSub = this.doctorsService.doctor.subscribe((doctor) => {
      this.doctor = doctor;
      this.fillDoctorForm(doctor);
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.doctorsService.getDoctorById(params['id']);
    });
  }

  turnOnEditMode() {
    this.isEditMode = true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
    });
  }

  onFormSubmit(formRef: NgForm) {
    this.isEditMode = false;
    this.openSnackBar('Dane lekarza zostały edytowane!', 'Zamknij');
    //TU DODAĆ EDYCJE DANYCH PACJENTA
    console.log(formRef.control.value);
  }

  private fillDoctorForm(doctor: Doctor) {
    this.doctorForm.control.patchValue({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      postCode: doctor.address.postCode,
      city: doctor.address.city,
      homeNumber: doctor.address.houseNumber,
    });

    this.specializations = doctor.specializations;
  }
}
