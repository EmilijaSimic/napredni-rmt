import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreirajKompanijuModalComponent } from './kreiraj-kompaniju-modal.component';

describe('KreirajKompanijuModalComponent', () => {
  let component: KreirajKompanijuModalComponent;
  let fixture: ComponentFixture<KreirajKompanijuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KreirajKompanijuModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KreirajKompanijuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
