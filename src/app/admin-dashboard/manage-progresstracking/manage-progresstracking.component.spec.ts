import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProgresstrackingComponent } from './manage-progresstracking.component';

describe('ManageProgresstrackingComponent', () => {
  let component: ManageProgresstrackingComponent;
  let fixture: ComponentFixture<ManageProgresstrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProgresstrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProgresstrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
