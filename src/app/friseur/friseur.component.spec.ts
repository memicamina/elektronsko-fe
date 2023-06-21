import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriseurComponent } from './friseur.component';

describe('FriseurComponent', () => {
  let component: FriseurComponent;
  let fixture: ComponentFixture<FriseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
