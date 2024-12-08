import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent implements OnInit{

  adminName: string = 'Vidur';
  currentDate: string = '';
  currentTime: string = '';
  searchQuery: string = '';
  gymDetails = {
    totalUsers: 150,
    trainers: 12,
    nutritionists: 8,
    workingHours: '6 AM - 10 PM',
    isActive: true
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000); // Update time every second
  }

  updateDateTime() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
  }

  logout() {
    // Simulating logout
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/client-dashboard/${route}`]);
  }

  search() {
    console.log('Searching for:', this.searchQuery);
    // Add actual search logic here
  }

}
