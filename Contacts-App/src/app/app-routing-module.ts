import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Komponente
import { Login } from './features/authentication/pages/login/login';
import { Signup } from './features/authentication/pages/signup/signup';
import { ContactsOverview } from './features/contacts/pages/contacts-overview/contacts-overview';
import { ContactsNew } from './features/contacts/pages/contacts-new/contacts-new';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'contacts', component: ContactsOverview },
  { path: 'contacts/new', component: ContactsNew }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
