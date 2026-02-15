import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartneriComponent } from './partneri.component';

describe('PartneriComponent', () => {
  let component: PartneriComponent;
  let fixture: ComponentFixture<PartneriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartneriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartneriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
