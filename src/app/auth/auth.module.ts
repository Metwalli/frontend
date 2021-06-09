import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module'
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from '../core/services/auth.service';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth.component'




@NgModule({
  declarations: [
    SignUpComponent, 
    SignInComponent, 
    ForgotPasswordComponent, 
    VerifyEmailComponent, 
    DashboardComponent, AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    // ... Existing Providers
    AuthService,
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
  ]
})
export class AuthModule { }
