import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService } from './../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;
  barChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoBarras();
  }

  configurarGraficoPizza() {
    this.dashboardService.lancamentosPorCategoria()
      .then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                  '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }

  configurarGraficoBarras() {
    this.dashboardService.lancamentosPorPessoa()
      .then(dados => {
       const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === "RECEITA"));
       const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === "DESPESA"));
        this.barChartData = {
          labels: ['Totais entrada/saida'],
          datasets: [
            {
              label: 'Receitas',
              // data: dados.map(dado => dado.total),
              borderColor: '#3366CC',
              data: totaisReceitas
            }, {
              label: 'Despesas',
              // data: dados.map(dado => dado.total),
              borderColor: '#D62B00',
              data: totaisDespesas

            }
          ]
        };
      });
  }

  private totaisPorCadaDiaMes(dados) {

    const totais: number[] = [];
    let total = 0;

      for (const dado of dados) {
          total = total + dado.total;
      }
      totais.push(total);
    return totais;
  }

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }
}
