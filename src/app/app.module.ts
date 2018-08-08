import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CheckInComponent } from './check-in/check-in.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { AddPessoaComponent } from './add-pessoa/add-pessoa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CheckInComponent,
    ConsultasComponent,
    AddPessoaComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxSpinnerModule    
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
