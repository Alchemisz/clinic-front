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
  visitsChangedSub!: Subscription;
  peselSub!: Subscription;
  pesel!: string;

  constructor(
    private visitsService: VisitsService,
    private authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.visitsSub.unsubscribe();
    this.peselSub.unsubscribe();
    this.visitsChangedSub.unsubscribe();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.visitsSub = this.visitsService.visits.subscribe((visits: Visit[]) => {
      this.visits = visits;
    });

    this.visitsChangedSub = this.visitsService.visitsChanged.subscribe(
      (flag) => {
        this.visitsService.getUpcomingPatientVisits(+this.pesel);
      }
    );

    this.peselSub = this.authService.pesel.subscribe((pesel) => {
      this.pesel = pesel;
      this.visitsService.getUpcomingPatientVisits(+pesel);
    });
    this.authService.getPatientUserPesel();
  }
}
