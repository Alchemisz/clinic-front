import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Patient } from '../patient.model';
import { PatientsService } from '../patients.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  @ViewChild('searchPhrase') searchInput!: ElementRef;
  isSearchModeActive: boolean;

  patients: Patient[] = [];
  patientsSub: Subscription = new Subscription;
  patientChangedSub: Subscription = new Subscription;
  totalPagesSub: Subscription = new Subscription;
  currentPage: number;
  totalPages: number;
  numbers: number[];

  isLoadingData: boolean;

  constructor(private patientSerivce: PatientsService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.numbers = [];
    this.isSearchModeActive = false;
    this.isLoadingData = true;
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
        
        this.isLoadingData = false;
      });

  }

  fetchPatientsByPage(pageIndex: number, searchPattern?: string): void{
    this.currentPage = pageIndex;
    this.patientsSub.unsubscribe();

    this.fetchPatientsByPagination(pageIndex, searchPattern);
  }

  private fetchPatientsByPagination(pageIndex: number, searchPattern?: string) : void{
    
    if(this.isSearchModeActive){
      searchPattern = this.searchInput.nativeElement.value;
    }

    this.patientsSub = this.patientSerivce.getPatientsByPage(this.currentPage, searchPattern)
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
