import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-subscriptions',
  templateUrl: './manage-subscriptions.component.html',
  styleUrls: ['./manage-subscriptions.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ManageSubscriptionsComponent implements OnInit {
  subscriptions: any[] = [];
  apiUrl = 'https://localhost:7039/api/Subscription'; // Replace with your API URL

  newSubscription = {
    subscriptionId: 0,
    userId: 0,
    subscriptionType: '',
    startDate: '',
    endDate: '',
    paymentStatus: '',
  };

  editingSubscription: any = null;
  showAddUserForm: boolean = false;
  showEditUserForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.subscriptions = data;
    });
  }

  addSubscription() {
    this.http.post(this.apiUrl, this.newSubscription).subscribe(() => {
      alert('Subscription added successfully!');
      this.loadSubscriptions();
      this.newSubscription = {
        subscriptionId: 0,
        userId: 0,
        subscriptionType: '',
        startDate: '',
        endDate: '',
        paymentStatus: '',
      };
    });
    this.showAddUserForm = false;
  }

  editSubscription(subscription: any) {
    this.editingSubscription = { ...subscription };
    this.showEditUserForm = true;
    this.showAddUserForm = false;
  }

  addNewUserForm() {
    this.showAddUserForm = true;
    this.showEditUserForm = false;
  }

  updateSubscription() {
    if (!this.editingSubscription) return;

    this.http
      .put(`${this.apiUrl}/${this.editingSubscription.subscriptionId}`, this.editingSubscription)
      .subscribe(() => {
        alert('Subscription updated successfully!');
        this.loadSubscriptions();
        this.editingSubscription = null;
      });
      this.showEditUserForm = false;
  }

  deleteSubscription(subscriptionId: number) {
    this.http.delete(`${this.apiUrl}/${subscriptionId}`).subscribe(() => {
      alert('Subscription deleted successfully!');
      this.loadSubscriptions();
    });
  }

  cancelEdit() {
    this.editingSubscription = null;
  }
}
