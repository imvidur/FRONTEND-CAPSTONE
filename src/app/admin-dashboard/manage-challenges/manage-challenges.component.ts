import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrls: ['./manage-challenges.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ManageChallengesComponent implements OnInit {
  challenges: any[] = [];
  apiUrl = 'https://localhost:7039/api/Challenges'; // Replace with your API URL

  newChallenge = {
    challengeId: 0,
    name: '',
    startDate: '',
    endDate: '',
    userId: 0,
    goal: '',
    status: '',
  };

  editingChallenge: any = null;
  showAddUserForm: boolean = false;
  showEditUserForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadChallenges();
  }

  loadChallenges() {
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.challenges = data;
    });
  }

  addChallenge() {
    if (!this.isChallengeValid(this.newChallenge)) {
      alert('Please fill in all fields');
      return;
    }

    this.http.post(this.apiUrl, this.newChallenge).subscribe(() => {
      alert('Challenge added successfully!');
      this.loadChallenges();
      this.resetNewChallenge();
    });
    this.showAddUserForm = false;
  }

  editChallenge(challenge: any) {
    this.editingChallenge = { ...challenge };
    this.showEditUserForm = true;
    this.showAddUserForm = false;
  }
  addNewUserForm() {
    this.showAddUserForm = true;
    this.showEditUserForm = false;
  }
  updateChallenge() {
    if (!this.editingChallenge) return;

    if (!this.isChallengeValid(this.editingChallenge)) {
      alert('Please fill in all fields');
      return;
    }

    this.http
      .put(`${this.apiUrl}/${this.editingChallenge.challengeId}`, this.editingChallenge)
      .subscribe(() => {
        alert('Challenge updated successfully!');
        this.loadChallenges();
        this.editingChallenge = null;
      });
      this.showEditUserForm = false;
  }

  deleteChallenge(challengeId: number) {
    this.http.delete(`${this.apiUrl}/${challengeId}`).subscribe(() => {
      alert('Challenge deleted successfully!');
      this.loadChallenges();
    });
  }

  cancelEdit() {
    this.editingChallenge = null;
  }

  resetNewChallenge() {
    this.newChallenge = {
      challengeId: 0,
      name: '',
      startDate: '',
      endDate: '',
      userId: 0,
      goal: '',
      status: '',
    };
  }

  // Helper method to validate challenge data
  isChallengeValid(challenge: any): boolean {
    return (
      challenge.name &&
      challenge.startDate &&
      challenge.endDate &&
      challenge.userId &&
      challenge.goal &&
      challenge.status
    );
  }
}
