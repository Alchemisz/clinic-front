import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../../doctors/doctors.service';
import { Doctor } from '../../doctors/model/doctor.model';
import { Patient } from '../../patients/patient.model';
import { PatientsService } from '../../patients/patients.service';
import { VisitsService } from '../visits.service';

@Component({
  selector: 'app-add-visit-form',
  templateUrl: './add-visit-form.component.html',
  styleUrls: ['./add-visit-form.component.css'],
})
export class AddVisitFormComponent implements OnInit, AfterViewInit {
  @ViewChild('peselInput') peselInput!: ElementRef;
  @ViewChild('formRef') addVisitForm!: NgForm;
  doctors: Doctor[] = [];
  doctorsSub!: Subscription;
  patient!: Patient;
  patientSub!: Subscription;

  constructor(
    private doctorsService: DoctorsService,
    private patientService: PatientsService,
    private visitsService: VisitsService
  ) {}

  ngAfterViewInit(): void {
    this.doctorsService.getDoctorDTOs();
  }

  ngOnInit(): void {
    this.doctorsSub = this.doctorsService.doctors.subscribe((doctors) => {
      this.doctors = doctors;
    });

    this.patientSub = this.patientService.patient.subscribe((patient) => {
      this.patient = patient;
      this.addVisitForm.form.patchValue({
        firstName: patient.firstName,
        lastName: patient.lastName,
      });
    });
  }

  onFormSubmit(formRef: NgForm) {
    let doctorId = this.getDoctorIdByData(formRef.value['doctor']);
    let patientPesel = formRef.value['pesel'];
    let visitDate = formRef.value['visitDate'];

    let addVisitCommand = {
      doctorId: doctorId,
      patientPesel: patientPesel,
      visitDate: visitDate,
    };

    this.visitsService.addVisit(addVisitCommand);
  }

  confirmPesel() {
    this.patientService.getPatientByPesel(this.peselInput.nativeElement.value);
  }

  private getDoctorIdByData(doctorData: string): number {
    let doctorId = +this.doctors
      .filter((doctor: Doctor) => {
        let data = doctor.firstName + ' ' + doctor.lastName;
        return data === doctorData;
      })
      .map((doctor) => doctor.id);
    return doctorId;
  }
}
