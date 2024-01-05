import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInformationTableComponent } from './account-information-table.component';

describe('AccountInformationTableComponent', () => {
  let component: AccountInformationTableComponent;
  let fixture: ComponentFixture<AccountInformationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountInformationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountInformationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
