import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  selectedRole: string = 'client';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  onSubmit() {
  console.log('Username:', this.username);
  console.log('Password:', this.password);
  
  this.http.post<{ token: string, role: string }>('https://localhost:7039/api/Auth/login', { 
    username: this.username, 
    password: this.password 
  })
  .subscribe({
    next: (response) => {

      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_role', response.role);
      this.authService.setRole(response.role); 

      this.router.navigate([`${response.role.toLowerCase()}-dashboard/dashboard`]); 
    },
    error: (err) => {
      console.error('Login failed:', err);
      alert('Invalid credentials!');
    }
  });
  }
}
