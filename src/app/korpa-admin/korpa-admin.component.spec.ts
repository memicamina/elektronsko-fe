import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorpaAdminComponent } from './korpa-admin.component';

describe('KorpaAdminComponent', () => {
  let component: KorpaAdminComponent;
  let fixture: ComponentFixture<KorpaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorpaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorpaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
