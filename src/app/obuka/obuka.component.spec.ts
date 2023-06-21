import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObukaComponent } from './obuka.component';

describe('ObukaComponent', () => {
  let component: ObukaComponent;
  let fixture: ComponentFixture<ObukaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObukaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
