import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { AuthGuard } from './app/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './app/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './app/admin-dashboard/manage-users/manage-users.component';
import { ClientDashboardComponent } from './app/client-dashboard/client-dashboard.component';
import { NutritionistDashboardComponent } from './app/nutritionist-dashboard/nutritionist-dashboard.component';
import { TrainerDashboardComponent } from './app/trainer-dashboard/trainer-dashboard.component';
import { ManageFitnessClassesComponent } from './app/admin-dashboard/manage-fitness-classes/manage-fitness-classes.component';
import { ManageChallengesComponent } from './app/admin-dashboard/manage-challenges/manage-challenges.component';
import { ManageSubscriptionsComponent } from './app/admin-dashboard/manage-subscriptions/manage-subscriptions.component';
import { ManageMealPlansComponent } from './app/admin-dashboard/manage-mealplans/manage-mealplans.component';
import { ManagePaymentsComponent } from './app/admin-dashboard/manage-payment/manage-payment.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { ManageMessageComponent } from './app/admin-dashboard/manage-message/manage-message.component';
import { ProgressTrackingComponent } from './app/admin-dashboard/manage-progresstracking/manage-progresstracking.component';
import { ManageWorkoutComponent } from './app/admin-dashboard/manage-workout/manage-workout.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Admin' },
    children:[
        { path: 'dashboard', component: DashboardComponent },
    {
    path: 'manage-users',
    component: ManageUsersComponent},
    {
        path: 'manage-fitness-classes',
        component: ManageFitnessClassesComponent,
    },
    {
        path: 'manage-challenges',
        component:ManageChallengesComponent
    },
    {
        path: 'manage-subscriptions',
        component: ManageSubscriptionsComponent
    },
    {   
        path:'manage-meal-plans',
        component: ManageMealPlansComponent
    },
    {
        path:'manage-payments',
        component: ManagePaymentsComponent
    }
    ],
},
  {
    path: 'client-dashboard',
    component: ClientDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Client' },
    children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: 'manage-message', component: ManageMessageComponent },
        
        { path: 'manage-workout', component: ManageWorkoutComponent },
       
    {
        path: 'manage-fitness-classes',
        component: ManageFitnessClassesComponent,
    },
    {
        path: 'manage-challenges',
        component:ManageChallengesComponent
    },
    {
        path: 'manage-subscriptions',
        component: ManageSubscriptionsComponent
    },
    {   
        path:'manage-meal-plans',
        component: ManageMealPlansComponent
    },
    {
        path:'manage-payments',
        component: ManagePaymentsComponent
    }
    ],
  },
  {
    path: 'nutritionist-dashboard',
    component: NutritionistDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Nutritionist' },
    children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: 'manage-subscriptions', component: ManageSubscriptionsComponent },
        { path: 'manage-challenges', component: ManageChallengesComponent },
        { path: 'manage-progresstracking', component: ProgressTrackingComponent },
    {   
        path:'manage-meal-plans',
        component: ManageMealPlansComponent
    },
    {
        path:'manage-payments',
        component: ManagePaymentsComponent
    }
    ],
  },
  {
    path: 'trainer-dashboard',
    component: TrainerDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'Trainer' },
    children:[
        { path: 'dashboard', component: DashboardComponent },
        { path: 'manage-workout', component: ManageWorkoutComponent },
        { path: 'manage-progresstracking', component: ProgressTrackingComponent },
    {
        path: 'manage-fitness-classes',
        component: ManageFitnessClassesComponent,
    },
    {
        path: 'manage-challenges',
        component:ManageChallengesComponent
    },
    {
        path: 'manage-subscriptions',
        component: ManageSubscriptionsComponent
    },
    {
        path:'manage-payments',
        component: ManagePaymentsComponent
    }
    ],
  },
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule)],
});
