import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PatientsService } from '../../patients/patients.service';
import { Visit } from '../visit-nav-menu/visit.model';
import { VisitsService } from '../visits.service';

@Component({
  selector: 'app-patient-visits',
  templateUrl: './patient-visits.component.html',
  styleUrls: ['./patient-visits.component.css'],
})
export class PatientVisitsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  visits: Visit[] = [];
  visitsSub!: Subscription;
  peselSub!: Subscription;

  constructor(
    private visitsService: VisitsService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.visitsSub.unsubscribe();
    this.peselSub.unsubscribe();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.visitsSub = this.visitsService.visits.subscribe((visits: Visit[]) => {
      this.visits = visits;
    });
    this.peselSub = this.authService.pesel.subscribe((pesel) => {
      this.visitsService.getUpcomingPatientVisits(+pesel);
    });
    this.authService.getPatientUserPesel();
  }
}