import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksModalComponent } from './thanks-modal.component';

describe('ThanksModalComponent', () => {
  let component: ThanksModalComponent;
  let fixture: ComponentFixture<ThanksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
