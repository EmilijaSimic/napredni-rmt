import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ProjektiComponent
} from './projekti.component';

describe('PartneriComponent', () => {
  let component: ProjektiComponent;
  let fixture: ComponentFixture < ProjektiComponent > ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [ProjektiComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProjektiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});