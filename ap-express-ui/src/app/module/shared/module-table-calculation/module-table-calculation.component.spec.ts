import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTableCalculationComponent } from './module-table-calculation.component';

describe('ModuleTableCalculationComponent', () => {
  let component: ModuleTableCalculationComponent;
  let fixture: ComponentFixture<ModuleTableCalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTableCalculationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTableCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
