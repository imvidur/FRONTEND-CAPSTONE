import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-mealplans',
  templateUrl: './manage-mealplans.component.html',
  styleUrls: ['./manage-mealplans.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ManageMealPlansComponent implements OnInit {
  mealPlans: any[] = [];
  apiUrl = 'https://localhost:7039/api/MealPlans'; // Replace with your API URL

  newMealPlan = {
    mealPlanId: 0,
    userId: 0,
    day: '',
    mealType: '',
    recipeId: 0,
    calories: 0,
  };

  editingMealPlan: any = null;
  showAddDietForm: boolean = false;
  showEditDietForm: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMealPlans();
  }

  loadMealPlans() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.mealPlans = data;
    });
  }

  addMealPlan() {
    this.http.post(this.apiUrl, this.newMealPlan).subscribe(() => {
      alert('Meal Plan added successfully!');
      this.loadMealPlans();
      this.resetNewMealPlan();
      this.showAddDietForm = false;
    });
  }

  editMealPlan(mealPlan: any) {
    this.editingMealPlan = { ...mealPlan };
    this.showEditDietForm = true;
    this.showAddDietForm = false;
  }

  addNewDietForm() {
    this.showAddDietForm = true;
    this.showEditDietForm = false;
  }

  updateMealPlan() {
    if (!this.editingMealPlan) return;

    this.http
      .put(`${this.apiUrl}/${this.editingMealPlan.mealPlanId}`, this.editingMealPlan)
      .subscribe(() => {
        alert('Meal Plan updated successfully!');
        this.loadMealPlans();
        this.editingMealPlan = null;
      });
      this.showEditDietForm = false;
  }

  deleteMealPlan(mealPlanId: number) {
    this.http.delete(`${this.apiUrl}/${mealPlanId}`).subscribe(() => {
      alert('Meal Plan deleted successfully!');
      this.loadMealPlans();
    });
  }

  resetNewMealPlan() {
    this.newMealPlan = {
      mealPlanId: 0,
      userId: 0,
      day: '',
      mealType: '',
      recipeId: 0,
      calories: 0,
    };
  }

  cancelEdit() {
    this.editingMealPlan = null;
  }
}
