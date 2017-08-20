import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './modules/router/router.module';
import { AuthenticationService } from './services/authentication/authentication.service';
import { PropertyService } from './services/property/property.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { BidDetailComponent } from './components/bid-detail/bid-detail.component';
import { CurrencyPipe } from '@angular/common';
import { UserCountComponent } from './components/user-count/user-count.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BidDetailComponent,
    UserCountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  providers: [ AuthenticationService, PropertyService, AuthGuard, CurrencyPipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
