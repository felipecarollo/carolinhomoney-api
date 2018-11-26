import { Injectable } from '@angular/core';

import 'rxjs/operator/toPromise';
import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class DashboardService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  lancamentosPorCategoria(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
      .toPromise();
  }

  lancamentosPorPessoa(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-pessoa`)
      .toPromise();
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }

}
