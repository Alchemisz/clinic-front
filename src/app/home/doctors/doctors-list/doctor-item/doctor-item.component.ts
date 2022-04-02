import { Component, Input, OnInit } from '@angular/core';
import { DoctorsService } from '../../doctors.service';
import { Doctor } from '../../model/doctor.model';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.css']
})
export class DoctorItemComponent implements OnInit {

  @Input()
  doctor!: Doctor;

  constructor(private doctorService: DoctorsService){}

  ngOnInit(): void {
  }

}
