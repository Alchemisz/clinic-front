import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient
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
          return data.content;
        })
      );
  }

}
