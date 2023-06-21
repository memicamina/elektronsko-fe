import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuponiComponent } from './kuponi.component';

describe('KuponiComponent', () => {
  let component: KuponiComponent;
  let fixture: ComponentFixture<KuponiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuponiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KuponiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
