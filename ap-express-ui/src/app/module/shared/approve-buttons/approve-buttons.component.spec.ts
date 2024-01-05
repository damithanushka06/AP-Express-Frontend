import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveButtonsComponent } from './approve-buttons.component';

describe('ApproveButtonsComponent', () => {
  let component: ApproveButtonsComponent;
  let fixture: ComponentFixture<ApproveButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
