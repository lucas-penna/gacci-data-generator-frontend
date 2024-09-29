import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientsComponent } from './components/patients/patients.component';
import { RegisterComponent } from './components/register/register.component';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: ListPatientsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new-patient', component: PatientsComponent}
];
