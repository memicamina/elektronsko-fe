import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugeAdminComponent } from './usluge-admin.component';

describe('UslugeAdminComponent', () => {
  let component: UslugeAdminComponent;
  let fixture: ComponentFixture<UslugeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UslugeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UslugeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
