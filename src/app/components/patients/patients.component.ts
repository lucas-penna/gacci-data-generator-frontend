import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    ButtonModule,
    CalendarModule,
    AccordionModule,
  ],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {
  paciente = {
    nome: '',
    cep: '',
    endereco: {
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
      numero: ''
    },
    idade: null,
    dataNascimento: null,
    telefone: '',
    rg: '',
    cpf: '',
    localTrabalho: '',
    grauInstrucao: null,
    rendaMensal: '',
    estadoCivil: null,
    auxilioSolicitado: null
  };

  grausInstrucao = [
    { label: 'Ensino Fundamental', value: 'fundamental' },
    { label: 'Ensino Médio', value: 'medio' },
    { label: 'Ensino Superior', value: 'superior' }
  ];

  estadosCivis = [
    { label: 'Solteiro', value: 'solteiro' },
    { label: 'Casado', value: 'casado' },
    { label: 'Divorciado', value: 'divorciado' }
  ];

  auxilios = [
    { label: 'Auxílio 1', value: 'auxilio1' },
    { label: 'Auxílio 2', value: 'auxilio2' },
    { label: 'Auxílio 3', value: 'auxilio3' }
  ];

  formatarMoeda(valor: string) {
    const valorNumerico = Number(valor.replace(/[^0-9]/g, '')); // Remove caracteres não numéricos
    const valorFormatado = (valorNumerico / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
    this.paciente.rendaMensal = valorFormatado.replace("R$", "R$ "); // Adiciona o prefixo R$ com espaço
  }
}
