import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  public email: string;
  public pass: string;

  constructor() {
    this.email = '';
    this.pass = '';
  }

  public onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      let text = `Prijava uporabnika:\nEmail: ${this.email}\nGeslo: ${this.pass}`;
      alert(text);
      console.log(text);
    } else {
      alert("Prosimo, izpolnite vse zahtevane podatke za prijavo.");
      console.log("Prosimo, izpolnite vse zahtevane podatke za prijavo.");
    }
  }
}
