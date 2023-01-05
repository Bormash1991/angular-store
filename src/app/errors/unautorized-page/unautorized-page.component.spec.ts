import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnautorizedPageComponent } from './unautorized-page.component';

describe('UnautorizedPageComponent', () => {
  let component: UnautorizedPageComponent;
  let fixture: ComponentFixture<UnautorizedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnautorizedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnautorizedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
