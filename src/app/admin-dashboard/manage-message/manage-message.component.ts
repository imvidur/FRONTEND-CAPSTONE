import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-messages',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-message.component.html',
  styleUrls: ['./manage-message.component.scss'],
  standalone: true,
})
export class ManageMessageComponent implements OnInit {
  messages: any[] = [];
  apiUrl = 'https://localhost:7039/api/Message'; // Replace with your backend URL

  newMessage = { senderId: '', receiverId: '', messageContent: '', status: 'Sent' };
  showAddMessageForm: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load messages between default sender and receiver (replace IDs with actual values)
    this.loadMessages(2); // Example: Load messages between senderId: 1 and receiverId: 2
  }

  loadMessages(senderId: number) {
    this.http.get(`${this.apiUrl}/${senderId}`).subscribe((data: any) => {
      this.messages = data;
    });
  }

  addMessage() {
    const payload = {
      receiverId: Number(this.newMessage.receiverId), // Convert to number
      messageContent: this.newMessage.messageContent,
      status: this.newMessage.status,
    };
  
    this.http.post(this.apiUrl, payload).subscribe(() => {
      alert('Message added successfully!');
      this.loadMessages(Number(this.newMessage.senderId)); // Ensure numbers are passed
      this.newMessage = { senderId: '', receiverId: '', messageContent: '', status: 'Sent' };
      this.showAddMessageForm = false;
    });
  }
  

  showAddForm() {
    this.showAddMessageForm = true;
  }
}
