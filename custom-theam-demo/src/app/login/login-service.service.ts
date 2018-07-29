import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as EventSource from 'eventsource';

import { LoginModel } from './login.model';
import 'rxjs/add/operator/map';
@Injectable()
export class LoginServiceService {
  private baseUrl = '/api/user';
  private customersList: LoginModel[] = new Array();
  private customersListSearch: LoginModel[] = new Array();
  constructor(private http: HttpClient) {
  }

  createUser(customer: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/create`, customer);
  }

  updateUser(id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getUserList(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
    }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/delete`, { responseType: 'text' });
  }

  findCustomers(name): Observable<any> {
    this.customersListSearch = new Array();

    return Observable.create((observer) => {
      const eventSource = new EventSource(`${this.baseUrl}` + `/findbyname?name=` + name);
      eventSource.onmessage = (event) => {
        console.log('eventSource.onmessage: ', event);
        const json = JSON.parse(event.data);
        this.customersListSearch.push(new LoginModel());
        observer.next(this.customersListSearch);
      };

      eventSource.onerror = (error) => observer.error('eventSource.onerror: ' + error);

      return () => eventSource.close();
    });
  }

}
