import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartLinkComponent } from './start-link.component';

describe('StartLinkComponent', () => {
  let component: StartLinkComponent;
  let fixture: ComponentFixture<StartLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
