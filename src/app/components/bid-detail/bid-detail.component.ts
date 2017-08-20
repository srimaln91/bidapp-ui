import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property/property.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Property } from '../../classes/property';

@Component({
  selector: 'app-bid-detail',
  templateUrl: './bid-detail.component.html',
  styleUrls: ['./bid-detail.component.css']
})
export class BidDetailComponent implements OnInit {

  private property: any;
  private sub: any;
  private bidValue;

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
  }

  submitBid() {

    this.propertyService.submitBid(this.property._id, this.authenticationService.getUserId, this.bidValue)
    .then(property => this.property = property);
  }

}
