import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Resp } from '../clases/resp';
import { develop } from '../utils/environment ';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {

  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

  public get(url: string): Observable<Resp> {
    if (develop == true) url = "http://localhost:3000" + url;
    return this.http.get<Resp>(url, this.httpOptions)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error')))
  }

  public post(url: string, body: Object): Observable<Resp> {
    if (develop == true) url = "http://localhost:3000" + url;
    let bodyString = JSON.stringify(body);
    return this.http.post<Resp>(url, body, this.httpOptions) // ...using post request
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))); //...errors if any
  }

  public postDel(url: string, id: string): Observable<Resp> {
    if (develop == true) url = "http://localhost:3000" + url;
    return this.http.delete<Resp>(`${url}/${id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))); //...errors if any

  }

  public update(url: string, body: Object): Observable<Resp> {
    if (develop == true) url = "http://localhost:3000" + url;
    let bodyString = JSON.stringify(body);
    return this.http.delete<Resp>(`${url}/${body['id']}`, this.httpOptions) // ...using post request
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))); //...errors if any

  }

  public delete(url: string, body: Object, id: string): Observable<Resp> {
    if (develop == true) url = "http://localhost:3000" + url;
    return this.http.delete<Resp>(`${url}/${id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error'))); //...errors if any


  }


}
