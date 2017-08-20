import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property/property.service';
import { Property } from '../../classes/property';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  properties: Property[];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void {

    this.propertyService.getProperties()
      .then(properties => this.properties = properties);

  }

}
