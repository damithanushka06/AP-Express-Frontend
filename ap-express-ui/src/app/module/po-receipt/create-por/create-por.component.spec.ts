import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePorComponent } from './create-por.component';

describe('CreatePorComponent', () => {
  let component: CreatePorComponent;
  let fixture: ComponentFixture<CreatePorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
