import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobniModalComponent } from './robni-modal.component';

describe('RobniModalComponent', () => {
  let component: RobniModalComponent;
  let fixture: ComponentFixture<RobniModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobniModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobniModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
