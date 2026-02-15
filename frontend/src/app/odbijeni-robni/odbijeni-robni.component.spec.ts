import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdbijeniRobniComponent } from './odbijeni-robni.component';

describe('OdbijeniRobniComponent', () => {
  let component: OdbijeniRobniComponent;
  let fixture: ComponentFixture<OdbijeniRobniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdbijeniRobniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdbijeniRobniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
