import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  public email: string;
  public pass: string;

  constructor(private authService: AuthService) {
    this.email = '';
    this.pass = '';
  }

  public onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      let text = `Prijava uporabnika:\nEmail: ${this.email}\nGeslo: ${this.pass}`;
      //alert(text);
      console.log(text);

      this.authService.loginUser({email: this.email, pass: this.pass}).subscribe({
        next: (data) => {
          this.authService.setToken("Bearer " + data.token);
        },
        error: (error) => {
          console.error('Error logging in user:', error)
        },
        complete: () => {
          console.log('User login completed!');
        }
      });
    } else {
      alert("Prosimo, izpolnite vse zahtevane podatke za prijavo.");
      console.log("Prosimo, izpolnite vse zahtevane podatke za prijavo.");
    }
  }
}
