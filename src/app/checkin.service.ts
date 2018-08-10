import { Injectable } from '@angular/core';
import { Checkin } from './Checkin';
import { HttpClient, HttpHeaders } from '../../node_modules/@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from '../../node_modules/rxjs';
import { catchError, tap } from '../../node_modules/rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class CheckinService {

  public data: Checkin[];
  public originalData: Checkin[];

  public pessoaUrl = "http://localhost:8090/checkins";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  //Pesquisa INI
  getData(): Checkin[]{
    return this.data;
  }

  setData(data: Checkin[]){
    this.data = data;
    this.originalData = data;
  }

  /*search(word){
    let result: Checkin[] = new Array<Checkin>();
    if (word !== null && word !== undefined ) {
      this.originalData.forEach((d) => {
        d = d as Checkin;
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
  }*/
  //Pesquisa FIM

  getContents(): Observable<Checkin[]> {
    return this.http.get<Checkin[]>(this.pessoaUrl)
    .pipe(
      tap(contents => this.log(`fetched contents`)),
      catchError(this.handleError('getContents', []))
    );
  }

  addContent(checkin: Checkin): Observable<Checkin> {
    return this.http.post<Checkin>(this.pessoaUrl, checkin, httpOptions)
    .pipe(
      tap((checkin: Checkin) => this.log(`added content w/ id=${checkin}`)),
      catchError(this.handleError<Checkin>('addContent'))
    )
  }

  updateContent(checkin: Checkin): Observable<Checkin>{
    let url = this.pessoaUrl + "/" + checkin.id;

    return this.http.put(url, checkin, httpOptions)
    .pipe(
      tap(_ => this.log(`fetched content id=${checkin.id}`)),
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
