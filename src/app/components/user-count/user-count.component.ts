import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.css']
})
export class UserCountComponent implements OnInit {

  private socket;
  userCount: Number;

  constructor() {

  }

  ngOnInit() {

    this.socket = io(environment.apiEndpoint);

    const that = this;
    this.socket.on('user-connected', function (data) {
      console.log(data);
      that.userCount = data.users;
    });
  }

}
