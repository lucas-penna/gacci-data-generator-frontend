import { Component, OnInit } from '@angular/core';

import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  crescimentoPacientesData: any;
  pacientesFaixaEtariaData: any;
  rendaMediaPacientesData: any;
  distribuicaoGeneroData: any;

  ngOnInit(): void {
    this.initCrescimentoPacientesData();
    this.initPacientesFaixaEtariaData();
    this.initRendaMediaPacientesData();
    this.initDistribuicaoGeneroData();
  }

  initCrescimentoPacientesData() {
    this.crescimentoPacientesData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Pacientes',
          data: [10, 20, 30, 50, 40, 60, 70],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.1
        }
      ]
    };
  }

  initPacientesFaixaEtariaData() {
    this.pacientesFaixaEtariaData = {
      labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
      datasets: [
        {
          data: [30, 40, 50, 20, 10],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A', '#FFA726'],
        }
      ]
    };
  }

  initRendaMediaPacientesData() {
    this.rendaMediaPacientesData = {
      labels: ['0-1k', '1k-3k', '3k-5k', '5k-10k', '10k+'],
      datasets: [
        {
          label: 'Pacientes',
          data: [40, 25, 15, 10, 10],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043']
        }
      ]
    };
  }

  initDistribuicaoGeneroData() {
    this.distribuicaoGeneroData = {
      labels: ['Masculino', 'Feminino', 'Outros'],
      datasets: [
        {
          data: [45, 50, 5],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        }
      ]
    };
  }

}
