import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBtnComponent } from './total-btn.component';

describe('TotalBtnComponent', () => {
  let component: TotalBtnComponent;
  let fixture: ComponentFixture<TotalBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
