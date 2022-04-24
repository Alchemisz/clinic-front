import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Visit } from './visit-nav-menu/visit.model';

interface CreateVisitCommand {
  doctorId: number;
  patientPesel: number;
  visitDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class VisitsService {
  visits = new Subject<Visit[]>();
  visitsChanged = new Subject<boolean>();
  totalPages = new Subject<number>();

  constructor(private http: HttpClient) {}

  addVisit(createVisitCommand: CreateVisitCommand) {
    console.log('WYSYŁAM: ');
    console.log(createVisitCommand);

    this.http
      .post('http://localhost:8080/visit/add', createVisitCommand)
      .subscribe((response) => {});
  }

  getUpcomingVisits(pageIndex: number) {
    this.http
      .get<any>('http://localhost:8080/visit/upcoming?page=' + pageIndex)
      .subscribe((response) => {
        this.totalPages.next(response.totalPages as number);
        this.visits.next(response.content as Visit[]);
        console.log(response.content as Visit[]);
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

  endVisit(visitId: number) {
    this.http
      .patch('http://localhost:8080/visit/end/' + visitId, null)
      .subscribe((response) => {
        this.visitsChanged.next(true);
      });
  }

  getUpcomingPatientVisits(pesel: number) {
    this.http
      .get<any>('http://localhost:8080/visit/upcoming/patient/' + pesel)
      .subscribe((response) => {
        this.visits.next(response as Visit[]);
      });
  }
}
