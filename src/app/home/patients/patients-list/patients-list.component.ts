import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from '../patient.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  patients: Patient[] = [];
  patientsSub: Subscription = new Subscription;
  pageSub: Subscription = new Subscription;
  currentPage: number;
  totalPages: number;
  numbers: number[];

  constructor(private patientSerivce: PatientsService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.numbers = [];
  }
  
  ngOnInit(): void {
    this.pageSub = this.patientSerivce.getTotalPages()
      .subscribe((totalPages: number) => {
        this.totalPages = totalPages;
        this.numbers = Array(this.totalPages);
      })

    this.patientsSub = this.patientSerivce.getPatientsByPage(this.currentPage)
      .subscribe(
        (patients: Patient[]) => {
          this.patients = patients;
        }
      );

  }

  fetchPatientsByPage(pageIndex: number): void{
    this.currentPage = pageIndex;
    this.patientsSub.unsubscribe();

    console.log(this.currentPage + ':' + this.totalPages);
    

    this.patientsSub = this.patientSerivce.getPatientsByPage(this.currentPage)
      .subscribe(
        (patients: Patient[]) => {
          this.patients = patients;
        }
      );
  }

  ngOnDestroy(): void {
    this.patientsSub.unsubscribe();
    this.pageSub.unsubscribe();
  }
  

}
