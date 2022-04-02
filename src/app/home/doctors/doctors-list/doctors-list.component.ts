import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../doctors.service';
import { Doctor } from '../model/doctor.model';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit, OnDestroy {

  doctors: Doctor[] = [];
  currentPage: number;
  totalPages: number;

  doctorsSub: Subscription = new Subscription();
  doctorsChangedSub: Subscription = new Subscription;
  totalPagesSub: Subscription = new Subscription;

  numbers: number[];

  isLoadingData: boolean;


  constructor(private doctorsService: DoctorsService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.numbers = [];
    this.isLoadingData = true;
   }

  ngOnDestroy(): void {
    this.doctorsSub.unsubscribe();
    this.totalPagesSub.unsubscribe();
    this.doctorsChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchDoctorsByPage(this.currentPage);

    this.doctorsChangedSub = this.doctorsService.doctorsChanged
      .subscribe(flag => {
          this.fetchDoctorsByPage(this.currentPage);
      })
    
    this.totalPagesSub = this.doctorsService.totalPages
      .subscribe(data => {
        this.totalPages = +data;
        this.numbers = Array(this.totalPages);
        
        this.isLoadingData = false;
      });
  }

  fetchDoctorsByPage(pageIndex: number): void{
    this.currentPage = pageIndex;
    this.doctorsSub.unsubscribe();

    this.fetchDoctorsByPagination(pageIndex);
  }

  private fetchDoctorsByPagination(pageIndex: number) : void{
    
    this.doctorsSub = this.doctorsService.getDoctorsByPage(this.currentPage)
      .subscribe(
        (doctors: Doctor[]) => {
          this.doctors = doctors;
        }
    );
  }

}
