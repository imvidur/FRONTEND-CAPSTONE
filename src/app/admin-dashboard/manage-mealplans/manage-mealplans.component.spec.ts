import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMealplansComponent } from './manage-mealplans.component';

describe('ManageMealplansComponent', () => {
  let component: ManageMealplansComponent;
  let fixture: ComponentFixture<ManageMealplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMealplansComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMealplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
