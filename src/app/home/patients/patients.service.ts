import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  patientsChanged = new Subject<Boolean>();
  totalPages = new Subject<Number>();

  constructor(
    private http: HttpClient
  ) {}


  public getPatients() : Observable<Patient[]>{
    return this.http
      .get<Patient[]>('http://localhost:8080/patient');
  }

  public getTotalPages(): Observable<any>{
    return this.http
      .get<any>('http://localhost:8080/patient/pageable')
      .pipe(
        map(data => {
          return data.totalPages;
        })
      );
  }

  public getPatientsByPage(pageIndex: number){
    return this.http
      .get<any>('http://localhost:8080/patient/pageable?page=' + pageIndex)
      .pipe(
        map(data => {
          this.totalPages.next(data.totalPages);
          return data.content;
        })
      );
  }

  public deleteByPesel(pesel: string){
    this.http
      .delete('http://localhost:8080/patient/' + pesel)
        .subscribe(response => {
          console.log(response)
          this.patientsChanged.next(true);
        });
  }

}
