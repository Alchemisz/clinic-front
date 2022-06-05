import { HttpClient } from '@angular/common/http';
import { STRING_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { Address } from 'src/app/shared/address.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { Patient } from './patient.model';

interface createPatientCommand {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  pesel: string;
  address: {
    postCode: string;
    city: string;
    houseNumber: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  patientsChanged = new Subject<Boolean>();
  totalPages = new Subject<Number>();
  patients = new Subject<Patient[]>();
  patient = new Subject<Patient>();
  pesel = new Subject<string>();

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  addPatient(createPatientCommand: createPatientCommand) {
    this.http
      .post('http://localhost:8080/patient', createPatientCommand)
      .subscribe((response) => {
        this.snackBarService.openSnackBar('Dodano pacjenta!', 'Zamknij');
      });
  }

  public updatePatient(updatePatientCommand: any) {
    this.http
      .patch('http://localhost:8080/patient/update', updatePatientCommand)
      .subscribe((response) => {
        this.snackBarService.openSnackBar(
          'Dane pacjenta zostały edytowane!',
          'Zamknij'
        );

        this.getPatientByPesel(updatePatientCommand['pesel']);
      });
  }

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>('http://localhost:8080/patient');
  }

  public generatePesel(dateOfBirth: any) {
    this.http
      .post<any>('http://localhost:8080/patient/pesel/generate', dateOfBirth)
      .subscribe((response) => {
        console.log(response);

        this.pesel.next(response as string);
      });
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
        this.snackBarService.openSnackBar('Usunięto pacjenta!', 'Zamknij');
        this.patientsChanged.next(true);
      });
  }
}
