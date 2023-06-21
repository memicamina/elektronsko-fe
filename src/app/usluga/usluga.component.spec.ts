import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UslugaComponent } from './usluga.component';

describe('UslugaComponent', () => {
  let component: UslugaComponent;
  let fixture: ComponentFixture<UslugaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UslugaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UslugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
