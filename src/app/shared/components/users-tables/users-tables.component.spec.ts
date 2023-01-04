import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTablesComponent } from './users-tables.component';

describe('UsersTablesComponent', () => {
  let component: UsersTablesComponent;
  let fixture: ComponentFixture<UsersTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
