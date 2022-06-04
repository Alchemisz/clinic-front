import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
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

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarService
  ) {}

  addVisit(createVisitCommand: CreateVisitCommand) {
    this.http
      .post('http://localhost:8080/visit/add', createVisitCommand)
      .subscribe((response) => {
        this.snackBarService.openSnackBar('Dodano wizytę!', 'Zamknij');
      });
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
        this.snackBarService.openSnackBar(
          'Wizyta została usunięta!',
          'Zamknij'
        );
        this.visitsChanged.next(true);
      });
  }

  endVisit(visitId: number) {
    this.http
      .patch('http://localhost:8080/visit/end/' + visitId, null)
      .subscribe((response) => {
        this.snackBarService.openSnackBar(
          'Wizyta została anulowana!',
          'Zamknij'
        );
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
