import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Visit } from '../../visit-nav-menu/visit.model';
import { VisitsService } from '../../visits.service';

@Component({
  selector: 'app-patient-visit-item',
  templateUrl: './patient-visit-item.component.html',
  styleUrls: ['./patient-visit-item.component.css'],
})
export class PatientVisitItemComponent implements OnInit {
  @Input()
  visit!: Visit;
  @Input()
  pesel!: string;
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

  cancelVisit(id: number) {
    if (confirm('Czy chcesz anulować wybraną wizytę?')) {
      this.visitsService.endVisit(id);
    }
  }
}
