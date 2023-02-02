import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BASEURL } from '@app/constants';
import { CUSTOMERSEARCH } from '@app/constants';
@Injectable({
  providedIn: 'root',
})
export class GenericHttpService<T> {
  // can't inject primitives, so use the @Inject decorator on url
  constructor(
    private httpClient: HttpClient,
    @Inject(String) private entity: string
  ) {} // constructor
 public getHttpClient(): HttpClient 
 {
return this.httpClient;
 }
  public add(item: T): Observable<T> {
    var data = this.httpClient
      .post<T>(`${BASEURL}${this.entity}`, item)
      .pipe(retry(2), catchError(this.handleError));
    return data;
  } // add

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${BASEURL}${this.entity}`, item)
      .pipe(retry(2), catchError(this.handleError));
  } // update

  public get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${BASEURL}${this.entity}`)
      .pipe(retry(2), catchError(this.handleError));
  } // getAll

  public delete(id: any): Observable<any> {
    return this.httpClient
      .delete<any>(`${BASEURL}${this.entity}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  } // delete

  public getByID(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${BASEURL}${this.entity}/id/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  } // getSome

  public getByString(prop: String, value: String): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${CUSTOMERSEARCH}prop=${prop}&value=${value}`)
      .pipe(retry(2), catchError(this.handleError));
  } // getSome

  // Error handling
  handleError(error: any) {
    let status: any;
    error.error instanceof ErrorEvent
      ? // Get client-side error
        (status = error.error.message)
      : // Get server-side error
        (status = `Error Code: ${error.status}\nMessage: ${error.message}`);
    window.alert(status);
    return throwError(() => status);
  }
} // GenericHttpService
