import { Component, OnInit } from '@angular/core';
import { Checkin } from '../Checkin';
import { CheckinService } from '../checkin.service';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../Pessoa';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  
  public checkin: Checkin;
  
  public pessoa: Pessoa;
  public pessoas: Pessoa[];
  
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
    let obj = checkin as Checkin;
    console.log(obj);
    
    let diarias = this.getDiarias(obj.dataEntrada, obj.dataSaida);
    console.log(diarias); 

  }
  
  getDiarias(dt1, dt2){
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

    return diff;
  }
  
}
