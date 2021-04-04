import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FireBaseConfig } from '../../environments/firebaseConfig'

import { ProductService } from './services/product.service'
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    AngularFireModule.initializeApp(FireBaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AuthService, 
    ProductService
  ]
})
export class CoreModule { }
