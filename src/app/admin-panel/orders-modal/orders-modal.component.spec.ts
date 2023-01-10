import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersModalComponent } from './orders-modal.component';

describe('OrdersModalComponent', () => {
  let component: OrdersModalComponent;
  let fixture: ComponentFixture<OrdersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
