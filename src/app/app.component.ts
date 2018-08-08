import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public height;

  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router
  ){ 
    router.events.subscribe((val) => {
      this.getWindowH();
  });
  }

  ngOnInit() {
    
  }

  onResize(event) {    
    this.getWindowH();
  }

  getWindowH(){
    this.height = window.innerHeight;   
    
    let main = $("#main");
    if(this.height > 650){
      main.css("height", this.height+"px");
    }
  }  
}
