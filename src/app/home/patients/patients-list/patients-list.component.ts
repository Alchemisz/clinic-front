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
  patientChangedSub: Subscription = new Subscription;
  totalPagesSub: Subscription = new Subscription;
  currentPage: number;
  totalPages: number;
  numbers: number[];

  constructor(private patientSerivce: PatientsService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.numbers = [];
  }
  
  ngOnInit(): void {
    this.fetchPatientsByPagination(this.currentPage);

    this.patientChangedSub = this.patientSerivce.patientsChanged
      .subscribe(flag => {
          this.fetchPatientsByPagination(this.currentPage);
      })
    
    this.totalPagesSub = this.patientSerivce.totalPages
      .subscribe(data => {
        this.totalPages = +data;
        this.numbers = Array(this.totalPages);
      });

  }

  fetchPatientsByPage(pageIndex: number): void{
    this.currentPage = pageIndex;
    this.patientsSub.unsubscribe();

    this.fetchPatientsByPagination(pageIndex);
  }

  private fetchPatientsByPagination(pageIndex: number) : void{
    this.patientsSub = this.patientSerivce.getPatientsByPage(this.currentPage)
      .subscribe(
        (patients: Patient[]) => {
          this.patients = patients;
        }
    );
  }

  ngOnDestroy(): void {
    this.patientsSub.unsubscribe();
    this.totalPagesSub.unsubscribe();
    this.patientChangedSub.unsubscribe();
  }
  

}
