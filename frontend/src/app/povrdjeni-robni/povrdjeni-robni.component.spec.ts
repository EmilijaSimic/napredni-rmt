import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PovrdjeniRobniComponent } from './povrdjeni-robni.component';

describe('PovrdjeniRobniComponent', () => {
  let component: PovrdjeniRobniComponent;
  let fixture: ComponentFixture<PovrdjeniRobniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PovrdjeniRobniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PovrdjeniRobniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
