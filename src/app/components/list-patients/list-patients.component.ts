import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Importar HttpClient para realizar a chamada HTTP
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PessoaService } from '../../services/pessoa.service';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, TableModule],
  templateUrl: './list-patients.component.html',
  styleUrl: './list-patients.component.css'
})
export class ListPatientsComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient, private patientService: PessoaService) { }

  ngOnInit(): void {
    this.fetchPacientes();
  }
  searchTerm: string = '';
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];
  displayModal: boolean = false;
  pacienteDetalhes: string = '';
  anexos: any[] = [];
  displayAnexosModal: boolean = false;


  fetchPacientes(): void {
    this.patientService.getPacientes().subscribe((data: any[]) => {
      this.pacientes = data;
      this.pacientesFiltrados = [...this.pacientes];
    });
  }

  buscarPacientes(): void {
    const termo = this.searchTerm.trim();
    if (termo) {
      this.patientService.findByFilter(termo).subscribe((data: any[]) => {
        this.pacientesFiltrados = data;
      });
    } else {
      this.pacientesFiltrados = [...this.pacientes];
    }
  }

  novoRegistro() {
    this.router.navigate(['/new-patient']);
  }

  openModal(id: number): void {
    this.patientService.getPacienteDetails(id).subscribe((data: string) => {
      this.pacienteDetalhes = data;
      this.displayModal = true;
    });
  }

  openAnexosModal(id: number) {
    this.patientService.getAnexos(id).subscribe(
      (response) => {
        this.anexos = response;  
        this.displayAnexosModal = true;
      },
      (error) => {
        console.error('Erro ao carregar anexos:', error);
      }
    );
  }

  closeModal() {
    this.displayModal = false;
  }
  downloadAnexo(id: number) {
    this.patientService.downloadAnexo(id).subscribe(response => {
      const fileName = response.fileName;
      const fileContent = response.fileContent; 
      
      const byteCharacters = atob(fileContent);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
  
      const blob = new Blob([byteArray], { type: 'application/octet-stream' });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a); 
    });
  }
  
  getFileNameFromResponse(response: HttpResponse<Blob>): string {
    const contentDisposition = response.headers.get('content-disposition');
    const matches = /filename="(.+)"/.exec(contentDisposition || '');
    return matches && matches[1] ? matches[1] : 'file.ext';
  }
}
