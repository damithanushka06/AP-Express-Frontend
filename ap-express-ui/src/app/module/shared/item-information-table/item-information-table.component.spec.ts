import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInformationTableComponent } from './item-information-table.component';

describe('ItemInformationTableComponent', () => {
  let component: ItemInformationTableComponent;
  let fixture: ComponentFixture<ItemInformationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInformationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemInformationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
