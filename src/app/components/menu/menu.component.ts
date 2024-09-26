import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SidebarModule, RouterModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  visibleSidebar: boolean = false;

  items = [
    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' },
    { label: 'Pacientes', icon: 'pi pi-fw pi-users', routerLink: '/patients' },
    { label: 'Cadastro', icon: 'pi pi-fw pi-user-plus', routerLink: '/register' },
    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() }
  ];

  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
