import { HttpClient } from '@angular/common/http';
import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  patientsChanged = new Subject<Boolean>();
  totalPages = new Subject<Number>();
  patients = new Subject<Patient[]>();
  patient = new Subject<Patient>();

  constructor(private http: HttpClient) {}

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('http://localhost:8080/patient');
  }

  public getTotalPages(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/patient/pageable').pipe(
      map((data) => {
        return data.totalPages;
      })
    );
  }

  public getPatientsByPage(pageIndex: number, searchPattern?: string) {
    let requestUrl: string =
      'http://localhost:8080/patient/pageable?page=' + pageIndex;

    if (typeof searchPattern !== 'undefined') {
      requestUrl =
        'http://localhost:8080/patient/pageable?page=' +
        pageIndex +
        '&value=' +
        searchPattern;
    }

    this.http
      .get<any>(requestUrl)
      .pipe(
        map((data) => {
          this.totalPages.next(data.totalPages);
          return data.content;
        })
      )
      .subscribe((patients: Patient[]) => {
        this.patients.next(patients);
      });
  }

  public getPatientByPesel(pesel: string) {
    this.http
      .get('http://localhost:8080/patient/' + pesel)
      .subscribe((response) => {
        this.patient.next(response as Patient);
      });
  }

  public deleteByPesel(pesel: string) {
    this.http
      .delete('http://localhost:8080/patient/' + pesel)
      .subscribe((response) => {
        console.log(response);
        this.patientsChanged.next(true);
      });
  }

  public generatePassword(): string {
    console.log('No implementation GENERATE_PASSWORD (patient_service)');
    return '';
  }

  public generatePesel(): string {
    console.log('No implementation GENERATE_PESEL (patient_service)');
    return '';
  }
}
