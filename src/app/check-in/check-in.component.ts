import { Component, OnInit } from '@angular/core';
import { Checkin } from '../Checkin';
import { CheckinService } from '../checkin.service';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../Pessoa';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
declare var require: any;

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  public checkin: Checkin;

  public pessoa: Pessoa;
  public pessoas: Pessoa[];

  public valDiaSegSex = 120;
  public valDiaFind = 150;
  public valCarroSegSex = 15;
  public valCarroFind = 20;

  constructor(
    private checkinService: CheckinService,
    private pessoaService: PessoaService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.checkin = new Checkin();
    this.pessoa = new Pessoa();

    this.getPessoas();
    setTimeout(() => {
      this.pessoas = this.pessoaService.getData();
      this.spinner.hide();
    }, 1000);

  }

  getPessoas(){
    this.pessoaService.getContents().subscribe(val => this.pessoaService.setData(val));
  }

  gravarCheckin(checkin){
    let possuiImpedimento;
    let obj = checkin as Checkin;
    let pessoa = new Pessoa();
    if(obj.dataEntrada != undefined && obj.dataSaida != undefined && obj.idPessoa != undefined){
      this.pessoas.forEach(e => {
        let aux = e as Pessoa;
        if(e.id == obj.idPessoa){
          pessoa = e;
        }
      });
      let valor = this.getDiarias(obj.dataEntrada, obj.dataSaida, obj.possuiVeiculo);
      if(valor == 'possuiImpedimento'){
        possuiImpedimento = true;
      }

      if(obj.idPessoa == undefined){
        possuiImpedimento = true;
        window.alert('É necessário selecionar um cliente!');
      }

      if(obj.possuiVeiculo == undefined){
        obj.possuiVeiculo = false;
      }

      if(!possuiImpedimento){
        window.alert('gravou');
        console.log(obj);
        obj.finalizado = false;
        this.checkinService.addContent(obj).subscribe(val => val);
        pessoa.valorGasto = valor;
        console.log(pessoa);
        this.pessoaService.updateContent(pessoa).subscribe(val => val);
      }else{
        window.alert('não gravou')
      }
    }else{
      window.alert('Preencha os campos!');
    }
  }

  getDiarias(dt1, dt2, veiculo){
    let possuiImpedimento = false;
    //formato do brasil 'pt-br'
    let moment = require('moment');
    moment.locale('pt-br');
    //setando data1
    var data1 = moment(dt1);
    //setando data2
    var data2 = moment(dt2);
    //tirando a diferenca da data2 - data1 em dias
    var diff  = data2.diff(data1, 'days');
    diff = diff + 1;

    if(data1 >= data2){
      window.alert('A data de saída deve ser maior que a data de entrada.')
      possuiImpedimento = true;
    }

    if(!possuiImpedimento){
      let aux1;
      let aux2;
      aux1 = dt2.split("T");
      aux2 = aux1[1].split(":");

      let horaSaida = parseInt(aux2[0]);
      let minutoSaida = parseInt(aux2[1]);

      if((horaSaida == 16) && (minutoSaida > 30)){
        diff = diff + 1;
      }else if(horaSaida > 16){
        diff = diff + 1;
      }

      let aux3;
      let aux4;
      aux3 = dt1.split("T");
      aux4 = aux3[1].split(":");

      let horaEntrada = aux4[0];
      let minutoEntrada = aux4[1];

      if(horaEntrada > horaSaida){
        diff = diff + 1;
      }else if((horaEntrada == horaSaida) && (minutoEntrada > minutoSaida)){
        diff = diff + 1;
      }

      let valor;
      valor = diff * this.valDiaSegSex;
      if(veiculo){
        valor = valor + this.valCarroSegSex;
      }
      if(possuiImpedimento){
        return 'possuiImpedimento';
      }else{
        return valor;
      }
    }else{
      return 'possuiImpedimento';
    }
  }

  integerToCpf(valor) {
    return valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
  }

}
