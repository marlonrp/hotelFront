import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../Pessoa';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  public pessoas: Pessoa[];
  public pessoa: Pessoa;

  constructor(
    private pessoaService: PessoaService,
    private spinner: NgxSpinnerService
  ) { 
    this.pessoas = [];
    this.pessoa = new Pessoa();
  }

  ngOnInit() {
    this.spinner.show();
    this.getPessoas();
    setTimeout(() => {
      this.pessoas = this.pessoaService.getData();
      this.spinner.hide()
    }, 1000);
  }

  getPessoas(){
    this.pessoaService.getContents().subscribe(val => this.pessoaService.setData(val));
  }

  numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }

}
