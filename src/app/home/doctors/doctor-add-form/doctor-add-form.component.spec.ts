import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAddFormComponent } from './doctor-add-form.component';

describe('DoctorAddFormComponent', () => {
  let component: DoctorAddFormComponent;
  let fixture: ComponentFixture<DoctorAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
