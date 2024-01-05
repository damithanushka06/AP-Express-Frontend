import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorListComponent } from './por-list.component';

describe('PorListComponent', () => {
  let component: PorListComponent;
  let fixture: ComponentFixture<PorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
