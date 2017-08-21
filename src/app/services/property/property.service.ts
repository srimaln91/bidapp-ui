import { Injectable, OnInit } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import * as io from 'socket.io-client';
import { Property } from '../../classes/property';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class PropertyService {

  todos: Property[] = [];
  id: number;

  apiBase = environment.apiEndpoint;
  headers: Headers;
  options: RequestOptions;
  private socket;

  constructor(private http: Http, private router: Router, private authService: AuthenticationService) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': user.token
    });
    this.options = new RequestOptions({ headers: this.headers });

    this.socket = io(this.apiBase, { query: 'access_token=' + user.token });

  }

  getProperties(propertyId = null): Promise<Property[]> {

    this.checkLogin();

    const endpoint = (propertyId == null) ? `${this.apiBase}property` : `${this.apiBase}property/` + propertyId;

    return this.http.get(endpoint, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Property[])
      .catch(this.handleError);

  }

  submitBid(propertyId, userId, value): Promise<any> {

    this.checkLogin();

    const endpoint = `${this.apiBase}bids`;

    return this.http.post(endpoint, JSON.stringify({ 'propertyId': propertyId, 'userId': userId, 'value': value }), this.options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  private checkLogin() {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  private handleError(error: any): Promise<any> {

    // if (error.status === 403) {
    //   return this.router.navigate(['/login']);
    // }
    return Promise.reject(error.message || error);
  }

}
