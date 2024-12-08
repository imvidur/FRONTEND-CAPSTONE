import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payment.component.html',
  styleUrls: ['./manage-payment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ManagePaymentsComponent implements OnInit {
  payments: any[] = [];
  apiUrl = 'https://localhost:7039/api/Payment'; // Replace with your API URL

  newPayment = {
    Id: 0,
    userId: 0,
    subscriptionId: 0,
    amount: 0,
    paymentDate: '',
    paymentMethod: '',
    paymentStatus: '',
  };

  editingClass: any = null;
  showAddUserForm: boolean = false;
  showEditUserForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.http.get(this.apiUrl).subscribe({
      next: (data: any) => {
        console.log('API Response:', data); // Check if `Id` exists in the response
        this.payments = data.map((payment: any) => ({
            ...payment,
            Id: payment.id, // Map `id` to `Id`
          }));
      },
      error: (err) => {
        console.error('Error loading payments:', err);
      },
    });
  }
  

  addPayment() {
    this.http.post(this.apiUrl, this.newPayment).subscribe(() => {
      alert('Payment added successfully!');
      this.loadPayments();
      this.resetNewPayment();
      this.showAddUserForm = false;
    });
  }

  editPayment(payment: any) {
    this.editingClass = { ...payment };
    console.log('Editing Payment:', this.editingClass); // Debug log
    this.showEditUserForm = true;
    this.showAddUserForm = false;
}

addNewUserForm() {
    this.showAddUserForm = true;
    this.showEditUserForm = false;
  }


  updatePayment() {
    if (!this.editingClass || !this.editingClass.Id) {
      console.error('Editing payment details are incomplete!');
      alert('Payment ID is missing. Please select a valid payment to edit.');
      return;
    }
    
    // Debug log to verify Id
    console.log('Updating payment with ID:', this.editingClass.Id);
  
    const { Id } = this.editingClass;
    this.http.put(`${this.apiUrl}/${Id}`, this.editingClass).subscribe({
      next: () => {
        alert('Payment updated successfully!');
        this.loadPayments();
        this.editingClass = null;
      },
      error: (err) => {
        console.error('Error updating payment:', err);
        alert('Failed to update payment. Please try again.');
      },
    });
    this.showEditUserForm = false;
  }
  

  deletePayment(paymentId: number) {
    console.log('Received Payment ID:', paymentId); // Debugging line
    if (paymentId) {
      this.http.delete(`${this.apiUrl}/${paymentId}`).subscribe({
        next: () => {
          alert('Payment deleted successfully!');
          
          // Immediately remove the payment from the local array (UI)
          this.payments = this.payments.filter(payment => payment.Id !== paymentId);
  
          // Optionally, you could reload the payments from the server, but this step may not be necessary
          // this.loadPayments(); // Uncomment if you want to reload from the backend
        },
        error: (err) => {
          console.error('Error deleting payment:', err);
          alert('Failed to delete payment. Please try again.');
        },
      });
    } else {
      console.error('Invalid Payment ID');
      alert('Invalid Payment ID. Please try again.');
    }
  }
  
  
  
  cancelEdit() {
    this.editingClass = null;
  }

  private resetNewPayment() {
    this.newPayment = {
      Id: 0,
      userId: 0,
      subscriptionId: 0,
      amount: 0,
      paymentDate: '',
      paymentMethod: '',
      paymentStatus: '',
    };
  }
}
