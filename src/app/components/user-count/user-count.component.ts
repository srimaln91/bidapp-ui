import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

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
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.socket = io('http://localhost:3100', { query: 'access_token=' + user.token });

    const that = this;
    this.socket.on('user-connected', function (data) {
      console.log(data);
      that.userCount = data.users;
    });
  }

}
