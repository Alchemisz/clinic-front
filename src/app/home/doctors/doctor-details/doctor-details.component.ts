import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, Subscription, startWith } from 'rxjs';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
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
  allSpecializations: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  specializationsCtrl = new FormControl();
  filteredFruits!: Observable<string[]>;
  choosenSpecializations: string[] = [];

  @ViewChild('specializationsInput')
  specializactionInput!: ElementRef<HTMLInputElement>;

  @ViewChild('formRef')
  doctorForm!: NgForm;

  constructor(
    private doctorsService: DoctorsService,
    private route: ActivatedRoute
  ) {
    this.filteredFruits = this.specializationsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allSpecializations.slice()
      )
    );

    this.doctorsService.specializations.subscribe((specializations) => {
      this.allSpecializations = specializations.map((spec) => spec.name);
    });

    this.doctorsService.getSpecializations();
  }

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

  onFormSubmit(formRef: NgForm) {
    this.isEditMode = false;

    let editDoctorCommand = {
      ...formRef.control.value,
      choosenSpecializations: this.choosenSpecializations,
    };

    this.doctorsService.updateDoctor(editDoctorCommand, +this.doctor.id);
  }

  private fillDoctorForm(doctor: Doctor) {
    this.doctorForm.control.patchValue({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      postCode: doctor.address.postCode,
      city: doctor.address.city,
      homeNumber: doctor.address.houseNumber,
    });

    this.choosenSpecializations = doctor.specializations.map(
      (spec) => spec.name
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.choosenSpecializations.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.specializationsCtrl.setValue(null);
  }

  remove(specialization: string): void {
    const index = this.choosenSpecializations.indexOf(specialization);

    if (index >= 0) {
      this.choosenSpecializations.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.choosenSpecializations.push(event.option.viewValue);
    this.specializactionInput.nativeElement.value = '';
    this.specializationsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.choosenSpecializations.filter((specialization) =>
      specialization.toLowerCase().includes(filterValue)
    );
  }
}
