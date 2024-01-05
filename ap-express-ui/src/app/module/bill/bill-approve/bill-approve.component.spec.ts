import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillApproveComponent } from './bill-approve.component';

describe('BillApproveComponent', () => {
  let component: BillApproveComponent;
  let fixture: ComponentFixture<BillApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
