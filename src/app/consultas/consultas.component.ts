import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../Pessoa';
import { NgxSpinnerService } from 'ngx-spinner';
import { CheckinService } from '../checkin.service';
import { Checkin } from '../Checkin';
import * as moment from 'moment';
declare var require: any;

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  @ViewChild('procurar')
  private inpSearch: ElementRef;

  public pessoas: Pessoa[];
  public pessoa: Pessoa;

  constructor(
    private pessoaService: PessoaService,
    private checkinService: CheckinService,
    private spinner: NgxSpinnerService
  ) {
    this.pessoas = [];
    this.pessoa = new Pessoa();
  }

  ngOnInit() {
    this.spinner.show();
    this.checkinService.getContents();
    this.getPessoas();
    setTimeout(() => {
      this.pessoas = this.pessoaService.getData();
      this.spinner.hide()
    }, 1000);
  }

  getPessoas(){
    this.pessoaService.getContents().subscribe(val => this.pessoaService.setData(val));
  }

  search(){
    let wordSearch = this.inpSearch.nativeElement.value;
    //this.pessoaService.search(wordSearch !== '' ? parseInt(wordSearch) : null);
    this.pessoaService.search(wordSearch !== '' ? wordSearch : null);
  }

  integerToCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
  }

  numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }

}
