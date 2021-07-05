import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { ServicioService } from './servicios/servicio.service';
import { CarritoComponent } from './paginas/carrito/carrito.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export const firebaseConfig = {
  apiKey: "AIzaSyDeMvM7BVia6Ah8fj3MTjqbtnYM_fkoPf8",
  authDomain: "mipavi-ae497.firebaseapp.com",
  databaseURL: "https://mipavi-ae497.firebaseio.com",
  projectId: "mipavi-ae497",
  storageBucket: "mipavi-ae497.appspot.com",
  messagingSenderId: "876186897951",
  appId: "1:876186897951:web:47260725cc09990f540f2a",
  measurementId: "G-QSEY62TP9L"
};

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule ,
    CommonModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ ServicioService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
