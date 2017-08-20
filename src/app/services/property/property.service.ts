import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Property } from '../../classes/property';

@Injectable()
export class PropertyService {

  todos: Property[] = [];
  id: number;

  apiBase = 'http://localhost:3100';
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http, private router: Router) {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': user.token
    });
    this.options = new RequestOptions({ headers: this.headers });

  }

  getProperties(propertyId = null): Promise<Property[]> {

    const endpoint = (propertyId == null) ? `${this.apiBase}/property` : `${this.apiBase}/property/` + propertyId;

    return this.http.get(endpoint, { headers: this.headers })
      .toPromise()
      .then(response => response.json() as Property[])
      .catch(this.handleError);

  }

  submitBid(propertyId, userId, value): Promise<any> {

    const endpoint = `${this.apiBase}/bids`;

    return this.http.post(endpoint, JSON.stringify({ 'propertyId': propertyId, 'userId': userId, 'value': value }), this.options)
      .toPromise()
      .then(response => response.json() )
      .catch(this.handleError);

  }

  private handleError(error: any): Promise<any> {

    // if (error.status === 403) {
    //   return this.router.navigate(['/login']);
    // }
    return Promise.reject(error.message || error);
  }

}
