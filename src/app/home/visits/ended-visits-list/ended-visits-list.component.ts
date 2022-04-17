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
  totalPageSub!: Subscription;

  constructor(private visitsService: VisitsService) {}

  ngOnInit(): void {
    this.visitsSub = this.visitsService.visits.subscribe((visits: Visit[]) =>
      console.log(visits)
    );

    this.totalPageSub = this.visitsService.totalPages.subscribe(
      (totalPages: number) => console.log(totalPages)
    );

    this.visitsService.getEndedVisits(1);
  }

  ngOnDestroy(): void {
    this.totalPageSub.unsubscribe();
    this.visitsSub.unsubscribe();
  }
}
