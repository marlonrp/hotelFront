import { Component, OnInit } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { Pessoa } from '../Pessoa';
import { PessoaService } from '../pessoa.service';

@Component({
  selector: 'app-add-pessoa',
  templateUrl: './add-pessoa.component.html',
  styleUrls: ['./add-pessoa.component.css']
})
export class AddPessoaComponent implements OnInit {
  
  private pessoa: Pessoa;

  constructor(
    private pessoaService: PessoaService
  ) { }
  
  ngOnInit() {
    this.pessoa = new Pessoa();
  }

  gravarPessoa(pessoa){
    console.log(pessoa);    
  }  
  
}
