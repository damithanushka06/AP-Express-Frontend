import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonWorkFlowComponent } from './common-work-flow.component';

describe('CommonWorkFlowComponent', () => {
  let component: CommonWorkFlowComponent;
  let fixture: ComponentFixture<CommonWorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonWorkFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
