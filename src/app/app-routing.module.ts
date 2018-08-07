import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ConsultasComponent } from './consultas/consultas.component';
import { CheckInComponent } from './check-in/check-in.component';
import { AddPessoaComponent } from './add-pessoa/add-pessoa.component';

const routes: Routes = [
  {path: 'consultas', component: ConsultasComponent},
  {path: 'checkIn', component: CheckInComponent},
  {path: '', redirectTo: '/checkIn', pathMatch: 'full'},
  {path: 'addPessoa', component: AddPessoaComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
