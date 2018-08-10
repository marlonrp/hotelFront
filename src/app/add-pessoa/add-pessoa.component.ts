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
  private pessoas: Pessoa[];

  constructor(
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.pessoa = new Pessoa();
    this.pessoaService.getContents().subscribe(val => this.pessoaService.setData(val));
    setTimeout(() => {
      this.pessoas = this.pessoaService.getData();
    }, 400);
  }

  gravarPessoa(pessoa){
    let obj = pessoa as Pessoa;
    obj.valorGasto = 0;
    let pessoaExiste = false;

    this.pessoas.forEach(e => {
      let pessoa = e as Pessoa;
      if((obj.nome == pessoa.nome) && (obj.documento == pessoa.documento)){
        pessoaExiste = true;
      }
    });

    setTimeout(() => {
      if(pessoaExiste == true){
        window.alert('Já existe um cadastro para esta pessoa!');
      }else if(pessoaExiste == false){
        this.pessoaService.addContent(obj).subscribe(val => val);
      }
    });
  }

}
