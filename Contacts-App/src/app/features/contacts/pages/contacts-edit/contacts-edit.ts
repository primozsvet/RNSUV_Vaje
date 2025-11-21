import { Component } from '@angular/core';
import { Contact } from '../../../../shared/classes/contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts-edit',
  standalone: false,
  templateUrl: './contacts-edit.html',
  styleUrl: './contacts-edit.css'
})
export class ContactsEdit {
  public contact: Contact;

  constructor() {
    this.contact = new Contact(1, 'Ana', 'Novak', '041 123 456', 'ana.novak@email.si', 'Mercator');
  }

  public onSubmit(contactForm: NgForm): void {

    if (contactForm.valid) {

      let text = "";

      if (this.contact.company) {
        text = `Urejanje kontakta:\nIme: ${this.contact.name}\nPriimek: ${this.contact.surname}\nTelefon: ${this.contact.phone}\nEmail: ${this.contact.email}\nPodjetje: ${this.contact.company}`;
      } else {
        text = `Urejanje kontakta:\nIme: ${this.contact.name}\nPriimek: ${this.contact.surname}\nTelefon: ${this.contact.phone}\nEmail: ${this.contact.email}`;
      }
      alert(text);
      console.log(text);
    } else {
      alert("Prosimo, izpolnite vse zahtevane podatke za urejanje kontakta.");
      console.log("Prosimo, izpolnite vse zahtevane podatke za urejanje kontakta.");
    }
  }
}
