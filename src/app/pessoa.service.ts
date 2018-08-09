import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Pessoa } from './Pessoa';
import { MessageService } from './message.service';
import { identifierModuleUrl } from '../../node_modules/@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class PessoaService {

  public data: Pessoa[];
  public originalData: Pessoa[];

  public pessoaUrl = "http://localhost:8090/pessoas";

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
        if (d.nome.match(word)) {
          result.push(d);
        }else if(d.documento.match(word)){
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

  addContent(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.pessoaUrl, pessoa, httpOptions)
    .pipe(
      tap((content: Pessoa) => this.log(`added content w/ id=${content}`)),
      catchError(this.handleError<Pessoa>('addContent'))
    )
  }

  updateContent(pessoa: Pessoa): Observable<Pessoa>{
    let url = this.pessoaUrl + "/" + pessoa.id;

    return this.http.put(url, pessoa, httpOptions)
    .pipe(
      tap(_ => this.log(`fetched content id=${pessoa.id}`)),
      catchError(this.handleError<any>('updateContent'))
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
