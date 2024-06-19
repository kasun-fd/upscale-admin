import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStatusManagerComponent } from './customer-status-manager.component';

describe('CustomerStatusManagerComponent', () => {
  let component: CustomerStatusManagerComponent;
  let fixture: ComponentFixture<CustomerStatusManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerStatusManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerStatusManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
