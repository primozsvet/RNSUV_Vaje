import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Contacts-App');

  public loggedIn = false;
  public isLoginForm = false;
  public contactViewMode: string = '';

}
