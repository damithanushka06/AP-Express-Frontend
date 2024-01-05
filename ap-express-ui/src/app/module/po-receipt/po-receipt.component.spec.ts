import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoReceiptComponent } from './po-receipt.component';

describe('PoReceiptComponent', () => {
  let component: PoReceiptComponent;
  let fixture: ComponentFixture<PoReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
