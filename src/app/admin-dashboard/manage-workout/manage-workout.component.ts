import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-workout',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-workout.component.html',
  styleUrls: ['./manage-workout.component.scss'],
  standalone: true,
})
export class ManageWorkoutComponent implements OnInit {
  workouts: any[] = [];
  apiUrl = 'https://localhost:7039/api/Workout'; // Replace with your backend URL

  newWorkout = {
    name: '',
    goal: '',
    difficultyLevel: '',
    description: '',
    trainerId: null,
    workoutCategoryId: null,
  };

  editingWorkout: any = null;
  showAddWorkoutForm: boolean = false;
  showEditWorkoutForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.workouts = data;
    });
  }

  addWorkout() {
    const payload = { ...this.newWorkout };

    this.http.post(this.apiUrl, payload).subscribe(() => {
      alert('Workout added successfully!');
      this.loadWorkouts();
      this.newWorkout = {
        name: '',
        goal: '',
        difficultyLevel: '',
        description: '',
        trainerId: null,
        workoutCategoryId: null,
      };
      this.showAddWorkoutForm = false;
    });
  }

  editWorkout(workout: any) {
    this.editingWorkout = { ...workout };
    this.showEditWorkoutForm = true;
    this.showAddWorkoutForm = false;
  }

  addNewWorkoutForm() {
    this.showAddWorkoutForm = true;
    this.showEditWorkoutForm = false;
  }

  updateWorkout() {
    if (!this.editingWorkout) return;

    const payload = { ...this.editingWorkout };

    this.http.put(`${this.apiUrl}/${this.editingWorkout.planId}`, payload).subscribe(
      () => {
        alert('Workout updated successfully!');
        this.loadWorkouts();
        this.editingWorkout = null;
      },
      (error) => {
        console.error('Error updating workout:', error);
      }
    );
    this.showEditWorkoutForm = false;
  }

  cancelEdit() {
    this.editingWorkout = null;
  }

  deleteWorkout(planId: number) {
    this.http.delete(`${this.apiUrl}/${planId}`).subscribe(() => {
      alert('Workout deleted successfully!');
      this.workouts = this.workouts.filter(workout => workout.planId !== planId);
    });
  }
}
