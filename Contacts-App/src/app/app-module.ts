import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { Login } from './features/authentication/pages/login/login';
import { Signup } from './features/authentication/pages/signup/signup';
import { ContactsOverview } from './features/contacts/pages/contacts-overview/contacts-overview';
import { ContactsNew } from './features/contacts/pages/contacts-new/contacts-new';
import { ContactsEdit } from './features/contacts/pages/contacts-edit/contacts-edit';

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
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
