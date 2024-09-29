import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { Escolaridade } from '../../model/enums/escolaridade';
import { EstadoCivil } from '../../model/enums/estadocivil';
import { TipoAuxilio } from '../../model/enums/tipoauxilio';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PessoaService } from '../../services/pessoa.service';
import { CheckboxModule } from 'primeng/checkbox';
import { TipoConstrucao } from '../../model/enums/tipoconstrucao';
import { FileUploadModule } from 'primeng/fileupload';
import { Router } from '@angular/router';


interface Auxilio {
  tipoAuxilio: TipoAuxilio;
  descricaoOutros: string;
}

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
    MultiSelectModule,
    CommonModule,
    HttpClientModule,
    CheckboxModule,
    FileUploadModule
  ],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent {

  @ViewChild('fileInput') fileInput: any;

  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }

  constructor(private http: HttpClient, private pessoaService: PessoaService, private router: Router) { }

  paciente = {
    nome: '',
    cep: '',
    endereco: {
      rua: '',
      cep: '',
      bairro: '',
      cidade: '',
      estado: '',
      numero: ''
    },
    idade: null as number | null,
    nascimento: null as Date | null,
    telefone: '',
    rg: '',
    cpf: '',
    localTrabalho: '',
    escolaridade: null as string | null,
    rendaMensal: 0,
    valorAluguel: 0,
    valorFinanciamento: 0,
    estadoCivil: null as string | null,
    tipoConstrucao: null as string | null,
    auxilioSolicitado: [] as TipoAuxilio[],
    outroAuxilio: '',
    diagnostico: '',
    providencia: '',
    saude: {
      inss: false,
      funeral: false,
      outra: false,
      descricao: ''
    },
    auxilios: [] as Auxilio[],
    file: null as File | null
  };

  mostrarOutro = false;
  mostrarOutroSaude = false;
  mostrarValorAluguel: boolean = false;
  mostrarValorFinanciamento: boolean = false;
  fileName: string = '';

  grausInstrucaoOptions = Object.keys(Escolaridade).map(key => ({
    label: Escolaridade[key as keyof typeof Escolaridade],
    value: key
  }));
  estadoCivilOptions = Object.keys(EstadoCivil).map(key => ({
    label: EstadoCivil[key as keyof typeof EstadoCivil],
    value: key
  }));
  tipoAuxilioOptions = Object.keys(TipoAuxilio).map(key => ({
    label: TipoAuxilio[key as keyof typeof TipoAuxilio],
    value: key
  }));
  tipoConstrucaoOptions = Object.keys(TipoConstrucao).map(key => ({
    label: TipoConstrucao[key as keyof typeof TipoConstrucao],
    value: key
  }));

  onTipoConstrucaoChange(event: any) {
    const selectedValue = event.value;

    this.mostrarValorAluguel = selectedValue === 'ALUGUEL';
    this.mostrarValorFinanciamento = selectedValue === 'FINANCIADA';
  }
  salvarPaciente() {
    const formData = new FormData();
  
    const pessoaDTO = {
      nome: this.paciente.nome,
      endereco: {
        rua: this.paciente.endereco.rua,
        cep: this.paciente.endereco.cep,
        bairro: this.paciente.endereco.bairro,
        cidade: this.paciente.endereco.cidade,
        estado: this.paciente.endereco.estado,
        numero: this.paciente.endereco.numero
      },
      idade: this.paciente.idade,
      nascimento: this.paciente.nascimento ? this.paciente.nascimento.toISOString() : null,
      telefone: this.paciente.telefone,
      rg: this.paciente.rg,
      cpf: this.paciente.cpf,
      localTrabalho: this.paciente.localTrabalho,
      escolaridade: this.paciente.escolaridade,
      rendaMensal: this.paciente.rendaMensal,
      estadoCivil: this.paciente.estadoCivil,
      tipoConstrucao: this.paciente.tipoConstrucao,
      auxilios: this.paciente.auxilios.map(auxilio => ({
        tipoAuxilio: auxilio.tipoAuxilio,
        descricaoOutros: auxilio.descricaoOutros
      })),
      outroAuxilio: this.paciente.outroAuxilio,
      diagnostico: this.paciente.diagnostico,
      providencia: this.paciente.providencia,
      saude: {
        inss: this.paciente.saude.inss,
        funeral: this.paciente.saude.funeral,
        outra: this.paciente.saude.outra,
        descricao: this.paciente.saude.descricao
      }
    };
  
    formData.append('pessoa', new Blob([JSON.stringify(pessoaDTO)], { type: "application/json" }));
  
    if (this.paciente.file) {
      formData.append('file', this.paciente.file);
    }
  
    this.pessoaService.salvarPessoa(formData).subscribe(
      (response) => {
        console.log('Paciente salvo com sucesso:', response);
        this.router.navigate(['/patients']);
      },
      (error) => {
        console.error('Erro ao salvar paciente:', error);
      }
    );
  }
  

  exibirCampoOutro() {
    this.mostrarOutro = this.paciente.auxilioSolicitado.includes(TipoAuxilio.OUTROS);
  }


  exibirCampoOutroSaude() {
    this.mostrarOutroSaude = this.paciente.saude.outra;
  }

  buscarEndereco() {
    const cep = this.paciente.endereco.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`)
        .subscribe((data) => {
          if (!data.erro) {
            this.paciente.endereco.rua = data.logradouro;
            this.paciente.endereco.bairro = data.bairro;
            this.paciente.endereco.cidade = data.localidade;
            this.paciente.endereco.estado = data.uf;
          } else {
            alert('CEP não encontrado!');
          }
        }, (error) => {
          console.error('Erro ao buscar o endereço', error);
        });
    }
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.paciente.file = file;
      this.fileName = file.fileName;
    }
  }
}
