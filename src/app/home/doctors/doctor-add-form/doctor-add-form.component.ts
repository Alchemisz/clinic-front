import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { DoctorsService } from '../doctors.service';

@Component({
  selector: 'app-doctor-add-form',
  templateUrl: './doctor-add-form.component.html',
  styleUrls: ['./doctor-add-form.component.css'],
})
export class DoctorAddFormComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  specializationsCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  choosenSpecializations: string[] = [];
  allSpecializations: string[] = [];

  @ViewChild('specializationsInput') fruitInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

  onFormSubmit(formRef: NgForm) {
    this.snackBarService.openSnackBar('Dodano lekarza!', 'Zamknij');

    formRef.form.addControl('specializations', this.specializationsCtrl);

    formRef.form.patchValue({
      specializations: this.choosenSpecializations,
    });

    this.doctorService.addDoctor(formRef.value);

    this.choosenSpecializations = [];
    this.specializationsCtrl.reset();
    this.specializationsCtrl.markAsPristine();
    this.specializationsCtrl.markAsUntouched();
    formRef.reset();
  }

  constructor(
    private doctorService: DoctorsService,
    private snackBarService: SnackBarService
  ) {
    this.filteredFruits = this.specializationsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allSpecializations.slice()
      )
    );

    this.doctorService.specializations.subscribe((specializations) => {
      this.allSpecializations = specializations.map((spec) => spec.name);
    });

    this.doctorService.getSpecializations();
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

  remove(fruit: string): void {
    const index = this.choosenSpecializations.indexOf(fruit);

    if (index >= 0) {
      this.choosenSpecializations.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.choosenSpecializations.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.specializationsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSpecializations.filter((specialization) =>
      specialization.toLowerCase().includes(filterValue)
    );
  }
}
