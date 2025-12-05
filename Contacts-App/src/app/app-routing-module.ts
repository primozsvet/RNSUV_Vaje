import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Komponente
import { Login } from './features/authentication/pages/login/login';
import { Signup } from './features/authentication/pages/signup/signup';
import { ContactsOverview } from './features/contacts/pages/contacts-overview/contacts-overview';
import { ContactsNew } from './features/contacts/pages/contacts-new/contacts-new';
import { ContactsEdit } from './features/contacts/pages/contacts-edit/contacts-edit';

// AuthGuard
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'contacts', component: ContactsOverview, canActivate: [authGuard] },
  { path: 'contacts/new', component: ContactsNew, canActivate: [authGuard] },
  { path: 'contacts/edit/:id', component: ContactsEdit, canActivate: [authGuard] },
  { path: '**', redirectTo: '/contacts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
