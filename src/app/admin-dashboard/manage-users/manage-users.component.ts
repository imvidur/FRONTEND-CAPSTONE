import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  imports:[CommonModule,FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  standalone: true
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  apiUrl = 'https://localhost:7039/api/User'; // Replace with your backend URL

  newUser = { username: '', email: '', role: '', password: '',phoneNumber:''};
  editingUser: any = null;
  showAddUserForm: boolean = false;
  showEditUserForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.users = data;
    });
  }
  

  addUser() {
    const payload = {
        username: this.newUser.username,
        email: this.newUser.email,
        role: this.newUser.role,
        phoneNumber: this.newUser.phoneNumber,
        password: this.newUser.password // Include the password
      };
    
    this.http.post(this.apiUrl, payload).subscribe(() => {
      alert('User added successfully!');
      this.loadUsers();
      this.newUser = { username: '', email: '', role: '', password: '',phoneNumber:' ' };
      this.showAddUserForm = false;
      
    });
  }

  editUser(user: any) {
    this.editingUser = { ...user };
    this.showEditUserForm = true;
    this.showAddUserForm = false;
  }

  addNewUserForm() {
    this.showAddUserForm = true;
    this.showEditUserForm = false;
  }

  updateUser() {
    if (!this.editingUser) return;
  
    const payload = {
      userId: this.editingUser.userId,
      username: this.editingUser.username,
      email: this.editingUser.email,
      role: this.editingUser.role,
      password: this.editingUser.password, // Ensure password is included
      phoneNumber: this.editingUser.phoneNumber // Ensure phoneNumber is included
    };
  
    console.log('Update payload:', payload); // Log the payload
  
    this.http.put(`${this.apiUrl}/${this.editingUser.userId}`, payload).subscribe(
      () => {
        alert('User updated successfully!');
        this.loadUsers();
        this.editingUser = null;
      },
      (error) => {
        console.error('Error updating user:', error); // Log the error
      }
    );
    this.showEditUserForm = false;
  }
  

  cancelEdit() {
    this.editingUser = null;
  }

  deleteUser(userId: string) {
    this.http.delete(`${this.apiUrl}/${userId}`).subscribe(() => {
      alert('User deleted successfully!');
      this.users = this.users.filter(user => user.userId !== userId);
    });
  }
}
