import { Component } from '@angular/core';
import { Contact } from '../../../../shared/classes/contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts-new',
  standalone: false,
  templateUrl: './contacts-new.html',
  styleUrl: './contacts-new.css'
})
export class ContactsNew {
  public contact: Contact;

  constructor() {
    this.contact = new Contact(-1, '', '', '', '', '');
  }

  public onSubmit(contactForm: NgForm): void {

    if (contactForm.valid) {

      let text = "";

      if(this.contact.company) {
        text = `Nov kontakt:\nIme: ${this.contact.name}\nPriimek: ${this.contact.surname}\nTelefon: ${this.contact.phone}\nEmail: ${this.contact.email}\nPodjetje: ${this.contact.company}`;
      } else {
        text = `Nov kontakt:\nIme: ${this.contact.name}\nPriimek: ${this.contact.surname}\nTelefon: ${this.contact.phone}\nEmail: ${this.contact.email}`;
      }
      alert(text);
      console.log(text);
    } else {
      alert("Prosimo, izpolnite vse zahtevane podatke za dodajanje novega kontakta.");
      console.log("Prosimo, izpolnite vse zahtevane podatke za dodajanje novega kontakta.");
    }
  }

}
