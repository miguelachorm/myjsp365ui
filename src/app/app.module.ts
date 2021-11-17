import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { FranchiseService } from './services/franchise.service';
import { RegisterFormService } from './services/register-form.service';
import { FormValidator } from './form-validator/form-validator';
import { BillingService } from './services/billing.service'
import { LoaderService } from './services/loader.service';
import { StaffService } from './services/staff.service'
import { AccountService } from './services/account.service'
import { GeolocationService } from './services/geolocation.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    RegisterFormService, 
    UserService, 
    AuthService, 
    FranchiseService, 
    FormValidator, 
    BillingService,
    LoaderService,
    StaffService,
    AccountService,
    GeolocationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
