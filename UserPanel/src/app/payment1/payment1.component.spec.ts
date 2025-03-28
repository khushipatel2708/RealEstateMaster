import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Payment1Component } from './payment1.component';

describe('Payment1Component', () => {
  let component: Payment1Component;
  let fixture: ComponentFixture<Payment1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Payment1Component]
    });
    fixture = TestBed.createComponent(Payment1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
