import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Visit } from '../visit-nav-menu/visit.model';
import { VisitsService } from '../visits.service';

@Component({
  selector: 'app-visit-list-item',
  templateUrl: './visit-list-item.component.html',
  styleUrls: ['./visit-list-item.component.css'],
})
export class VisitListItemComponent implements OnInit {
  @Input()
  visit!: Visit;
  visitDate!: string | null;

  constructor(
    private datepipe: DatePipe,
    private visitsService: VisitsService
  ) {}

  ngOnInit(): void {
    this.visitDate = this.datepipe.transform(
      this.visit.visitDate,
      'dd-MM-yyyy'
    );
  }

  deleteVisit(id: number) {
    this.visitsService.deleteVisit(id);
  }
}
