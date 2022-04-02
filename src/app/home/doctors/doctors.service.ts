import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctorsChanged = new Subject<Boolean>();
  totalPages = new Subject<Number>();

  constructor(private http: HttpClient) { }


  public getTotalPages(): Observable<any>{
    return this.http
      .get<any>('http://localhost:8080/doctor/pageable')
      .pipe(
        map(data => {
          return data.totalPages;
        })
      );
  }

  public getDoctorsByPage(pageIndex: number){

    let requestUrl: string = 'http://localhost:8080/doctor/pageable?page=' + pageIndex;

    return this.http
      .get<any>(requestUrl)
      .pipe(
        map(data => {
          this.totalPages.next(data.totalPages);
          return data.content;
        })
      );
  }
}
