import { Component } from '@angular/core';
import { User } from '../../../../shared/classes/user';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  public user: User;

  constructor() {
    this.user = new User ('','','','');
  }

  public onSubmit(): void {
    let tekst = `Registracija uporabnika:\nIme: ${this.user.name}\nPriimek: ${this.user.surname}\nEmail: ${this.user.email}\nGeslo: ${this.user.pass}`;
    alert(tekst);
    console.log(tekst);

    //console.log('Registrirani uporabnik:', this.user.name);
  }
}
