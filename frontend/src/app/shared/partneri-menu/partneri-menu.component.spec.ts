import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  PartneriMenuComponent
} from './partneri-menu.component';

describe('MenuComponent', () => {
  let component: PartneriMenuComponent;
  let fixture: ComponentFixture < PartneriMenuComponent > ;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [PartneriMenuComponent]
      })
      .compileComponents();

    fixture = TestBed.createComponent(PartneriMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
