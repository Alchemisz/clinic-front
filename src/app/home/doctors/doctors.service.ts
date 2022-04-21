import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Doctor } from './model/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  doctorsChanged = new Subject<boolean>();
  doctors = new Subject<Doctor[]>();
  totalPages = new Subject<Number>();
  doctor = new Subject<Doctor>();
  specializations = new Subject<
    {
      id: number;
      name: string;
    }[]
  >();

  constructor(private http: HttpClient) {}

  public getSpecializations() {
    this.http
      .get<any>('http://localhost:8080/doctor/specializations')
      .subscribe((response) => {
        this.specializations.next(
          response as {
            id: number;
            name: string;
          }[]
        );
      });
  }

  public getDoctorDTOs() {
    this.http.get<any>('http://localhost:8080/doctor/all').subscribe((data) => {
      this.doctors.next(data as Doctor[]);
    });
  }

  public deleteDoctorById(id: number) {
    this.http
      .delete<any>('http://localhost:8080/doctor/' + id)
      .subscribe((data) => {
        this.doctorsChanged.next(true);
      });
  }

  public getDoctorById(id: number) {
    this.http
      .get<any>('http://localhost:8080/doctor/' + id)
      .subscribe((data) => {
        this.doctor.next(data as Doctor);
      });
  }

  public getDoctorsByPage(pageIndex: number) {
    let requestUrl: string =
      'http://localhost:8080/doctor/pageable?page=' + pageIndex;

    return this.http.get<any>(requestUrl).pipe(
      map((data) => {
        this.totalPages.next(data.totalPages);
        return data.content;
      })
    );
  }
}
