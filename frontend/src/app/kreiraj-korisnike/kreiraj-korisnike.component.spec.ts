import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreirajKorisnikeComponent } from './kreiraj-korisnike.component';

describe('KreirajKorisnikeComponent', () => {
  let component: KreirajKorisnikeComponent;
  let fixture: ComponentFixture<KreirajKorisnikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KreirajKorisnikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KreirajKorisnikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
