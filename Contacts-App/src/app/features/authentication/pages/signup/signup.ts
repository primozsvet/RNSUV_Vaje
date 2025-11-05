import { Component } from '@angular/core';
import { User } from '../../../../shared/classes/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  
  public user: User;
  public confirmed: boolean = false;

  constructor() {
    this.user = new User ('','','','');
  }

  public onSubmit(regForm: NgForm): void {
    if(this.confirmed && regForm.valid) {
      let tekst = `Registracija uporabnika:\nIme: ${this.user.name}\nPriimek: ${this.user.surname}\nEmail: ${this.user.email}\nGeslo: ${this.user.pass}`;
      alert(tekst);
      console.log(tekst);
    } else {
      alert("Obrazec ni ustrezno izpolnjen!");
      console.log("Obrazec ni ustrezno izpolnjen!");
    }

    //console.log('Registrirani uporabnik:', this.user.name);
  }
}
