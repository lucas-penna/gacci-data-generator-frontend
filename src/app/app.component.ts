import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, WhatsappComponent, HttpClientModule, CommonModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[MessageService]
})
export class AppComponent {

  constructor(private messageService: MessageService) {}

  title = 'gacci-data-generator-front';
  fontSize: number = 16; 

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Operação realizada com sucesso!',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Algo deu errado!',
    });
  }

  increaseFont() {
    this.fontSize += 2;
  }

  decreaseFont() {
    if (this.fontSize > 10) {
      this.fontSize -= 2;
    }
  }
}
