import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private apiUrl = 'https://localhost:7039';  
    private loggedInSubject: BehaviorSubject<boolean>;
  
    constructor(private http: HttpClient, private router: Router) {
      this.loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
    }
  
    getToken(): string | null {
      return localStorage.getItem('auth_token');
    }
  
    setToken(token: string): void {
      console.log('Setting token in localStorage:', token);
      localStorage.setItem('auth_token', token);
    }
  
    isLoggedIn(): boolean {
      const token = this.getToken();
      if (!token) return false;
  
      try {
        const decodedToken: any = jwtDecode(token);
        const expiry = decodedToken.exp * 1000;  // Convert to milliseconds
        return Date.now() < expiry;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
  
    getClientId(): number | null {
      const clientId = localStorage.getItem('clientId');
      console.log('Client ID from localStorage:', clientId);  
      return clientId ? Number(clientId) : null;  
    }
  
    login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/api/Auth/login`, { email, password }).pipe(
        tap(response => {
          console.log('Login Response:', response);  
          if (response && response.clientId && response.token) {
            console.log('Saving token and clientId to localStorage:', response.token, response.clientId);
            localStorage.setItem('auth_token', response.token);  
            localStorage.setItem('clientId', response.clientId.toString());  
          } else {
            console.error('Missing clientId or token in the login response');
          }
        })
      );
    }
  
    logout(): void {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('clientId');  
      this.loggedInSubject.next(false);
      this.router.navigate(['/login']);
    }
  
    getUserRole(): string | null {
      const token = this.getToken();
      if (token) {
        const decoded: { role: string } = jwtDecode(token);
        return decoded.role || null;
      }
      return null;
    }
  
    get isLoggedIn$(): Observable<boolean> {
      return this.loggedInSubject.asObservable();
    }
  
    setRole(role: string): void {
      localStorage.setItem('role', role);
    }
  
    getRole(): string | null {
      return localStorage.getItem('role');
    }
  }
  