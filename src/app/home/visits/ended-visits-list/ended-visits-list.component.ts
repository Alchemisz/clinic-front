import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Visit } from '../visit-nav-menu/visit.model';
import { VisitsService } from '../visits.service';

@Component({
  selector: 'app-ended-visits-list',
  templateUrl: './ended-visits-list.component.html',
  styleUrls: ['./ended-visits-list.component.css'],
})
export class EndedVisitsListComponent implements OnInit, OnDestroy {
  visitsSub!: Subscription;
  visitsChangedSub!: Subscription;
  totalPageSub!: Subscription;
  visits: Visit[] = [];
  totalPages!: number;
  currentPage: number = 0;
  numbers: number[] = [];

  constructor(private visitsService: VisitsService) {}

  ngOnInit(): void {
    this.visitsSub = this.visitsService.visits.subscribe(
      (visits: Visit[]) => (this.visits = visits)
    );

    this.totalPageSub = this.visitsService.totalPages.subscribe(
      (totalPages: number) => {
        this.totalPages = totalPages;
        this.numbers = Array(this.totalPages);
      }
    );

    this.visitsChangedSub = this.visitsService.visitsChanged.subscribe(
      (value) => this.visitsService.getEndedVisits(this.currentPage)
    );

    this.visitsService.getEndedVisits(this.currentPage);
  }

  getEndedVisits(pageIndex: number): void {
    this.currentPage = pageIndex;
    console.log('PAGES:' + this.totalPages);
    console.log(pageIndex);

    this.visitsService.getEndedVisits(pageIndex);
  }

  ngOnDestroy(): void {
    this.totalPageSub.unsubscribe();
    this.visitsSub.unsubscribe();
    this.visitsChangedSub.unsubscribe();
  }
}
