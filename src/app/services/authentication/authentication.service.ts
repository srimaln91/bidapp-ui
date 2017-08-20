import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../../classes/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthenticationService {

  private apiBase = environment.apiEndpoint + 'auth/';
  private headers: Headers;
  private options: RequestOptions;
  private token: string;

  constructor(private http: Http) {

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });

  }

  authenticateUser(User: any): Observable<Boolean> {

    return this.http.post(this.apiBase, JSON.stringify(User), this.options)
      .map((response: Response) => {

        const token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response.json()));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });
  }

  getAuthToken(): string {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getUserId(): string {
    return JSON.parse(localStorage.getItem('currentUser')).user._id;
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    if (JSON.parse(localStorage.getItem('currentUser')).token) {
      return true;
    }
    return false;
  }
}
