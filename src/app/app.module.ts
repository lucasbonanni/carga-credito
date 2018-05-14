import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { BrowserTab } from '@ionic-native/browser-tab';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { MyApp } from './app.component';
import { firebaseConfig } from '../enviroments/enviroment';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { CreditDataProvider } from '../providers/credit-data/credit-data';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireDatabase,
    AuthServiceProvider,
    BarcodeScanner,
    BrowserTab,
    CreditDataProvider,
  ]
})
export class AppModule {}
