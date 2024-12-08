import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-progress-tracking',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-progresstracking.component.html',
  styleUrls: ['.//manage-progresstracking.component.scss'],
  standalone: true
})
export class ProgressTrackingComponent implements OnInit {
    progressData: any[] = [];
    apiUrl = 'https://localhost:7039/api/ProgressTracking'; // Replace with your backend URL
  
    newProgress = { userId: '', date: '', weight: '', bodyFatPercentage: '', muscleMass: '', notes: '' };
    editingProgress: any = null;
    showAddProgressForm: boolean = false;
    showEditProgressForm = false;
    clientId: number | null = null;
  
    constructor(private http: HttpClient, private authService: AuthService) {}
  
    ngOnInit() {
      this.clientId = this.authService.getClientId();
      console.log('Client ID from AuthService:', this.clientId);  // Log to verify client ID retrieval
      if (this.clientId !== null) {
        this.loadProgress();
      } else {
        console.error('Client ID not found');
      }
    }
  
    loadProgress() {
      if (this.clientId !== null) {
        this.http.get(`${this.apiUrl}/my-progress?clientId=${this.clientId}`).subscribe(
          (data: any) => {
            console.log('Progress Data:', data); // Log the data to check the response
            this.progressData = data;
          },
          (error) => {
            console.error('Error loading progress data:', error); // Log any errors
          }
        );
      }
    }
  
    addProgress() {
      const payload = {
        userId: this.newProgress.userId,
        date: this.newProgress.date,
        weight: this.newProgress.weight,
        bodyFatPercentage: this.newProgress.bodyFatPercentage,
        muscleMass: this.newProgress.muscleMass,
        notes: this.newProgress.notes
      };
  
      this.http.post(`${this.apiUrl}/update-progress`, payload).subscribe(
        () => {
          alert('Progress added successfully!');
          this.newProgress = { userId: '', date: '', weight: '', bodyFatPercentage: '', muscleMass: '', notes: '' };
          this.showAddProgressForm = false;
          this.loadProgress(); // Refresh the data after adding
        },
        (error) => {
          console.error('Error adding progress:', error); // Log any errors
        }
      );
    }
  
    editProgress(progress: any) {
      this.editingProgress = { ...progress };
      this.showEditProgressForm = true;
      this.showAddProgressForm = false;
    }
  
    addNewProgressForm() {
      this.showAddProgressForm = true;
      this.showEditProgressForm = false;
    }
  
    updateProgress() {
      if (!this.editingProgress) return;
  
      const payload = {
        progressId: this.editingProgress.progressId,
        userId: this.editingProgress.userId,
        date: this.editingProgress.date,
        weight: this.editingProgress.weight,
        bodyFatPercentage: this.editingProgress.bodyFatPercentage,
        muscleMass: this.editingProgress.muscleMass,
        notes: this.editingProgress.notes
      };
  
      console.log('Update payload:', payload); // Log the payload
  
      this.http.post(`${this.apiUrl}/update-progress`, payload).subscribe(
        () => {
          alert('Progress updated successfully!');
          this.loadProgress();
          this.editingProgress = null;
        },
        (error) => {
          console.error('Error updating progress:', error); // Log any errors
        }
      );
      this.showEditProgressForm = false;
    }
  
    cancelEdit() {
      this.editingProgress = null;
    }
  
    deleteProgress(progressId: string) {
      this.http.delete(`${this.apiUrl}/${progressId}`).subscribe(
        () => {
          alert('Progress deleted successfully!');
          this.progressData = this.progressData.filter(progress => progress.progressId !== progressId);
        },
        (error) => {
          console.error('Error deleting progress:', error); // Log any errors
        }
      );
    }
  }
  
