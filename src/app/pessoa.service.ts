import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Pessoa } from './Pessoa';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {
  
  public data: Pessoa[];
  public originalData: Pessoa[];

  public pessoaUrl = "http://www.mocky.io/v2/5b6a5335320000cd1aaf5f56";
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  
  //Pesquisa INI
  getData(): Pessoa[]{
    return this.data;
  }
  
  setData(data: Pessoa[]){
    this.data = data;
    this.originalData = data;
  }
  
  search(word){
    let result: Pessoa[] = new Array<Pessoa>();
    if (word !== null && word !== undefined ) {
      this.originalData.forEach((d) => {
        d = d as Pessoa;
        if ( d.documento == word || d.nome == word ) {
          result.push(d);
        }
      });
    } else {
      result = this.originalData;
    }
    this.data = result;
  }
  //Pesquisa FIM
  
  getContents(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.pessoaUrl)
    .pipe(
      tap(contents => this.log(`fetched contents`)),
      catchError(this.handleError('getContents', []))
    );
  }
  
  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  private log (message: string) {
    this.messageService.add('pessoaService: ' + message);
  }
}
