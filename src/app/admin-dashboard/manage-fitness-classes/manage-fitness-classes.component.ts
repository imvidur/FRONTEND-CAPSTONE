import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-fitness-classes',
  templateUrl: './manage-fitness-classes.component.html',
  styleUrls: ['./manage-fitness-classes.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
})
export class ManageFitnessClassesComponent implements OnInit {
  fitnessClasses: any[] = [];
  apiUrl = 'https://localhost:7039/api/FitnessClass'; // Replace with your API URL

  newClass = {
    classId: 0,
    name: '',
    category: '',
    trainerId: 0,
    userId: 0,
    scheduledTime: '',
    location: '',
    maximumCapacity: 0,
  };

  editingClass: any = null;
  showAddUserForm: boolean = false;
  showEditUserForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.fitnessClasses = data;
    });
  }

  addClass() {
    this.http.post(this.apiUrl, this.newClass).subscribe(() => {
      alert('Fitness class added successfully!');
      this.loadClasses();
      this.newClass = {
        classId: 0,
        name: '',
        category: '',
        trainerId: 0,
        userId: 0,
        scheduledTime: '',
        location: '',
        maximumCapacity: 0,
      };
      this.showAddUserForm = false;
    });
  }

  editClass(fitnessClass: any) {
    this.editingClass = { ...fitnessClass };
    this.showEditUserForm = true;
    this.showAddUserForm = false;
  }
  addNewUserForm() {
    this.showAddUserForm = true;
    this.showEditUserForm = false;
  }


  updateClass() {
    if (!this.editingClass) return;

    this.http
      .put(`${this.apiUrl}/${this.editingClass.classId}`, this.editingClass)
      .subscribe(() => {
        alert('Fitness class updated successfully!');
        this.loadClasses();
        this.editingClass = null;
      });
      this.showEditUserForm = false;
  }

  deleteClass(classId: number) {
    this.http.delete(`${this.apiUrl}/${classId}`).subscribe(() => {
      alert('Fitness class deleted successfully!');
      this.loadClasses();
    });
  }

  cancelEdit() {
    this.editingClass = null;
  }
}
