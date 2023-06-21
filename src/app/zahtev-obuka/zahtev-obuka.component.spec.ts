import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevObukaComponent } from './zahtev-obuka.component';

describe('ZahtevObukaComponent', () => {
  let component: ZahtevObukaComponent;
  let fixture: ComponentFixture<ZahtevObukaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevObukaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevObukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
