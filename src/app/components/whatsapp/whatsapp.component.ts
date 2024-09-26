import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent {
  whatsappLink: string = 'https://wa.me/5599999999999'; 
}
