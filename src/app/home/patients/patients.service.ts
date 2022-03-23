import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
