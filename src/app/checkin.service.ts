import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor() { }

  getContents(){
    console.log('getCheckins');
  }
}
