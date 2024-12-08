import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentDate: string = ''; 
  currentTime: string = ''; 
  totalUsers: number = 0; 
  totalTrainers: number = 0; 
  totalNutritionists: number = 0; 
  workingHours: string = '6 AM - 10 PM'; 
  isGymActive: boolean = true; 
  isLoading: boolean = false;

  userRole: string = '';  // Store user role
  isAdmin: boolean = false;  // Flag to check if user is admin

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.updateDateTime();
    this.fetchUsers();
    
    // Fetch user role directly from localStorage
    this.userRole = localStorage.getItem('role') || '';  // or 'user_role' if that's what you store
    console.log("User Role from localStorage:", this.userRole);  // Log the role to check if it is set correctly
    this.isAdmin = this.userRole === 'Admin';  // Check if role is admin
    
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
  }

  fetchUsers(): void {
    this.http.get<any>('https://localhost:7039/api/Auth/getData').subscribe({
      next: (response) => {
        this.totalUsers = response.totalUsers;
        this.totalTrainers = response.totalTrainers;
        this.totalNutritionists = response.totalNutritionists;
        this.workingHours = response.workingHours;
        this.isGymActive = response.isGymActive;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
}
