import { NumberInput } from '@angular/cdk/coercion';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const HEADERS = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

base_url = "https://em-system-heroku.herokuapp.com/"

  constructor(
    private http: HttpClient
  ) { }

  getAllEmployee() {
    return this.http.get<any>(this.base_url+"employee/all")
      .pipe(map((res: any) => {
        return res;
      }))
  }

  postUser(data: any) {
    return this.http.post<any>(this.base_url+ "user/signup", data)
      .pipe(map((res: any) => { return res; }))
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(this.base_url+"user/" + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateEmployee(data: any, id: number) {
    return this.http.put<any>(this.base_url+"employee/update/" + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  login(data: any) {
    return this.http.post<any>(this.base_url+"user/login", data)
      .pipe(map((res: any) => {
        return res;

      }))
  }


  getusername() {
    return this.http.get(this.base_url+"user/dashboard", {
      observe: 'body',
      // params: new HttpParams().append('token', localStorage.getItem('token')),
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  postAttendance(data: any) {
    return this.http.post<any>(this.base_url+"attendance/daily", data)
      .pipe(map((res: any) => { return res; }))
  }

  postLeave(data: any) {
    return this.http.post<any>(this.base_url+"leave/add", data)
      .pipe(map((res: any) => { return res; }))
  }

  postEmployee(data: any) {
    return this.http.post<any>(this.base_url+"employee/new", data, HEADERS)
      .pipe(map((res: any) => { return res; }))
  }

  postPayroll(data: any) {
    return this.http.post<any>(this.base_url+"payroll/add", data, HEADERS)
      .pipe(map((res: any) => { return res; }))
  }

  getPayrolls() {
    return this.http.get<any>(this.base_url+"payroll/all")
      .pipe(map((res: any) => { return res; }))
  }
  getAllAttendance() {
    return this.http.get<any>(this.base_url+"attendance/all")
      .pipe(map((res: any) => { return res; }))
  }

  getAllLeave() {
    return this.http.get<any>(this.base_url+"leave/all")
      .pipe(map((res: any) => { return res; }))
  }

}
