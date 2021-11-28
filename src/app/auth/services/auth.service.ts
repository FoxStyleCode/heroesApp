import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/aut.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl;
  private baseUrl2: string = environment.baseUrl2;

  private _auth: Auth | undefined;


  verificaAutenticacion():Observable<boolean>{

    if(!localStorage.getItem('token')){
      return of(false);
    }
      return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          this._auth = auth;
          return true;
        })
      );
  }

  constructor(private http:HttpClient) { }

  get auth(): any {
    return {...this._auth! }
  }

  data = {
    email   : 'maria@gmail.com',
    password: '1234567890'
  }

  login():Observable<any>{
  // let options = this.createRequestOptions();
  return this.http.post<any>(`${this.baseUrl2}/usuarios`, {email: 'maria@gmail.com',password: '1234567890'});
  }

  // private createRequestOptions() {
  //   let headers = new HttpHeaders({
  //       "Content-Type": "multipart/form-data",
  //   });
  //   return headers;
  // }

}
