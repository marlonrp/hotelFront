import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import $ from 'jquery';
import { PessoaService } from './pessoa.service';
import { CheckinService } from './checkin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public height;

  constructor(
    private pessoaService: PessoaService,
    private checkinService: CheckinService,
    private activatedRoute : ActivatedRoute,
    private router: Router
  ){
    router.events.subscribe((val) => {
      this.getWindowH();
    });
  }

  ngOnInit( ) {
    //this.getWindowH();
    this.pessoaService.getContents().subscribe(val => this.pessoaService.setData(val));
    this.checkinService.getContents();
  }

  onResize(event) {
    this.getWindowH();
  }

  getWindowH(){
    this.height = window.innerHeight;

    let main = $("#main");
    if(this.height > 450){
      main.css("height", this.height+"px");
    }else{
      main.css("height", "100%");
    }
  }
}
