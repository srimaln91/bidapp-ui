import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property/property.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Property } from '../../classes/property';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bid-detail',
  templateUrl: './bid-detail.component.html',
  styleUrls: ['./bid-detail.component.css']
})
export class BidDetailComponent implements OnInit {

  private property: any;
  private sub: any;
  private bidValue;
  private socket;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {

      const id = params['id'];

      this.propertyService.getProperties(id)
        .then(property => this.property = property);

    });

    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.socket = io(environment.apiEndpoint, { query: 'access_token=' + user.token });

    const that = this;
    this.socket.on('reload', function (data) {

      that.propertyService.getProperties(that.property._id)
        .then(property => that.property = property);
    });

  }

  submitBid() {
    const that = this;
    if (this.bidValue === '') {
      alert('Invalid value.');
      return;
    }else if (this.bidValue) {

    }
    this.propertyService.submitBid(this.property._id, this.authenticationService.getUserId, this.bidValue)
      .then(function (property) {
        that.property = property;
        that.socket.emit('new-bid');
        that.bidValue = '';
      });
  }

}
