import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private nonAuthUser: User = { _id: null, password: '', userName: '', email: '', token: '' };
  private error: String;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  authUser(): void {
    this.authService.authenticateUser(this.nonAuthUser)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/properties']);
        }
        this.error = 'Username or password is incorrect';
      });
  }
}
