import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../../shared/classes/contact';
import { NgForm } from '@angular/forms';

import { ContactsService } from '../../../../core/services/contacts-service';

@Component({
  selector: 'app-contacts-edit',
  standalone: false,
  templateUrl: './contacts-edit.html',
  styleUrl: './contacts-edit.css'
})
export class ContactsEdit implements OnInit {
  public contact: Contact;

  constructor(private contactsService: ContactsService) {
    //this.contact = new Contact(1, 'Ana', 'Novak', '041 123 456', 'ana.novak@email.si', 'Mercator');
    this.contact = new Contact(-1, '', '', '', '', '');
  }

  ngOnInit(): void {
    this.contactsService.getContactById(21).subscribe({
      next: (data) => {
        this.contact = new Contact(
          data.id || -1,
          data.name || '',
          data.surname || '',
          data.phone || '',
          data.email || '',
          data.company || ''
        );
      },
      error: (error) => {
        console.error('Error loading contact:', error);
      },
      complete: () => {
        console.log('Contact loaded successfully', this.contact);
      }
    });
  }

  public onSubmit(contactForm: NgForm): void {

    if (contactForm.valid) {

      let text = "";

      if (this.contact.company) {
        text = `Urejanje kontakta:\nIme: ${this.contact.name}\nPriimek: ${this.contact.surname}\nTelefon: ${this.contact.phone}\nEmail: ${this.contact.email}\nPodjetje: ${this.contact.company}`;
      } else {
        text = `Urejanje kontakta:\nIme: ${this.contact.name}\nPriimek: ${this.contact.surname}\nTelefon: ${this.contact.phone}\nEmail: ${this.contact.email}`;
      }
      //alert(text);
      console.log(text);

      this.contactsService.updateContact(this.contact.id, this.contact).subscribe({
        next: (data) => {
          this.contact = new Contact(
            data.id || -1,
            data.name || '',
            data.surname || '',
            data.phone || '',
            data.email || '',
            data.company || ''
          );
        },
        error: (error) => {
          console.error('Error updating contact:', error);
        },
        complete: () => {
          console.log('Contact updated successfully', this.contact);

        }
      });
    } else {
      alert("Prosimo, izpolnite vse zahtevane podatke za urejanje kontakta.");
      console.log("Prosimo, izpolnite vse zahtevane podatke za urejanje kontakta.");
    }
  }

  public onDelete(): void {
    this.contactsService.deleteContact(this.contact.id).subscribe({
      next: (data) => {
        this.contact.id = -1;
        this.contact.name = '';
        this.contact.surname = '';
        this.contact.phone = '';
        this.contact.email = '';
        this.contact.company = '';
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
      },
      complete: () => {
        console.log('Contact deleted successfully');
      }
    });
  }
}
