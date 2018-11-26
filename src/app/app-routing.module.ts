import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { RelatoriosModule } from './relatorios/relatorios.module';


const routes: Routes  = [

  { path: 'lancamentos', loadChildren: () => LancamentosModule },
  { path: 'pessoas', loadChildren: () => PessoasModule },
  { path: 'dashboard', loadChildren: () => DashboardModule },
  { path: 'relatorios', loadChildren: () => RelatoriosModule},


 // { path: 'lancamentos', loadChildren: './lancamentos/lancamentos.module.ts#LancamentosModule' },
 // { path: 'pessoas', loadChildren: './pessoas/pessoas.module.ts#PessoasModule' },
 // { path: 'dashboard', loadChildren: './dashboard/dashboard.module.ts#DashboardModule'},
  // { path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule' },

  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
