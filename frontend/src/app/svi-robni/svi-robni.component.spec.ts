import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SviRobniComponent } from './svi-robni.component';

describe('SviRobniComponent', () => {
  let component: SviRobniComponent;
  let fixture: ComponentFixture<SviRobniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SviRobniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SviRobniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
