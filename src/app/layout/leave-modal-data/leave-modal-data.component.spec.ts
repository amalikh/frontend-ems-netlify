import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveModalDataComponent } from './leave-modal-data.component';

describe('LeaveModalDataComponent', () => {
  let component: LeaveModalDataComponent;
  let fixture: ComponentFixture<LeaveModalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveModalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveModalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
