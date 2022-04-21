import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorsService } from '../../doctors.service';
import { Doctor } from '../../model/doctor.model';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.css'],
})
export class DoctorItemComponent implements OnInit {
  @Input()
  doctor!: Doctor;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private doctorsService: DoctorsService
  ) {}

  ngOnInit(): void {}

  showDetails(id: string) {
    this.router.navigate(['../szczegoly', id], { relativeTo: this.route });
  }

  deleteDoctor() {
    if (
      confirm(
        'Czy chcesz usunąć lekarza ' +
          this.doctor.firstName +
          ' ' +
          this.doctor.lastName
      )
    ) {
      this.doctorsService.deleteDoctorById(+this.doctor.id);
    }
  }
}
