import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Visit } from './visit-nav-menu/visit.model';

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  visits = new Subject<Visit[]>();
  visitsChanged = new Subject<boolean>();
  totalPages = new Subject<number>();

  constructor(private http: HttpClient) {}

  getUpcomingVisits(pageIndex: number) {
    this.http
      .get<any>('http://localhost:8080/visit/upcoming?page=' + pageIndex)
      .subscribe((response) => {
        this.totalPages.next(response.totalPages as number);
        this.visits.next(response.content as Visit[]);
      });
  }

  getEndedVisits(pageIndex: number) {
    this.http
      .get<any>('http://localhost:8080/visit/finished?page=' + pageIndex)
      .subscribe((response) => {
        this.totalPages.next(response.totalPages as number);
        this.visits.next(response.content as Visit[]);
      });
  }

  deleteVisit(visitId: number) {
    this.http
      .delete('http://localhost:8080/visit/' + visitId)
      .subscribe((response) => {
        this.visitsChanged.next(true);
      });
  }
}
