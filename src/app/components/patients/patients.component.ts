import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
};

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
    rendaMensal: null,  // Aqui o campo que usará a máscara de moeda
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
}
