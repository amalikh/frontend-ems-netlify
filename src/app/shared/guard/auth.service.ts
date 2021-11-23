import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  constructor(
    private http: HttpClient
  ) { }

  // login(data):Observable<any>{
  //   return this.http.post("http://localhost:3000/user/login", data )
  //   .pipe()
  // }
}
