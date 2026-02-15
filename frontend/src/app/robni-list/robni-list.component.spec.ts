import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RobniListComponent } from './robni-list.component';


describe('RobniListComponent', () => {
  let component: RobniListComponent;
  let fixture: ComponentFixture<RobniListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobniListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobniListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
