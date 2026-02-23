import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KompanijaDetaljiModalComponent } from './kompanija-detalji-modal.component';

describe('KompanijaDetaljiModalComponent', () => {
  let component: KompanijaDetaljiModalComponent;
  let fixture: ComponentFixture<KompanijaDetaljiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KompanijaDetaljiModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KompanijaDetaljiModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
