import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Uvoz FormsMoule
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Login } from './features/authentication/pages/login/login';
import { Signup } from './features/authentication/pages/signup/signup';
import { ContactsOverview } from './features/contacts/pages/contacts-overview/contacts-overview';
import { ContactsNew } from './features/contacts/pages/contacts-new/contacts-new';
import { ContactsEdit } from './features/contacts/pages/contacts-edit/contacts-edit';

// Uvoz provideHttpClient
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Storitve
import { ContactsService } from './core/services/contacts-service';
import { AuthService } from './core/services/auth-service';

// Prestrezniki
import { contactsInterceptor } from './core/interceptors/contacts-interceptor';

@NgModule({
  declarations: [
    App,
    Header,
    Footer,
    Login,
    Signup,
    ContactsOverview,
    ContactsNew,
    ContactsEdit
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([contactsInterceptor])),
    ContactsService,
    AuthService
  ],
  bootstrap: [App]
})
export class AppModule { }
