import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFitnessClassesComponent } from './manage-fitness-classes.component';

describe('ManageFitnessClassesComponent', () => {
  let component: ManageFitnessClassesComponent;
  let fixture: ComponentFixture<ManageFitnessClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFitnessClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageFitnessClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
