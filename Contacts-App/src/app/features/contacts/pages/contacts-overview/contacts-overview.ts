import { Component, OnInit } from '@angular/core';

import { Contact } from '../../../../shared/classes/contact';

//import demoContacts from '../../../../../../public/assets/demo/demo-contacts.json';

import { ContactsService } from '../../../../core/services/contacts-service';

@Component({
  selector: 'app-contacts-overview',
  standalone: false,
  templateUrl: './contacts-overview.html',
  styleUrl: './contacts-overview.css'
})
export class ContactsOverview implements OnInit {

  public contacts: Contact[] = [];

  /*
  public contact1: Contact = new Contact('', '', '', '', '');
  public contact2: Contact = new Contact('', '', '', '', '');

  public contactClassText1 = {};
  public contactClassText2 = {};

  public contactClassButton1 = {};
  public contactClassButton2 = {};
  */

  /*
  public name: string = '';
  public surname: string = '';
  public phone: string = '';
  public email: string = '';
  public company: string = '';

  public name2: string = '';
  public surname2: string = '';
  public phone2: string = '';
  public email2: string = '';
  public company2: string = '';
  */

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.loadContacts();
    /*
    this.contact1.name = 'Ana';
    this.contact1.surname = 'Novak';
    this.contact1.phone = '+38640123456';
    this.contact1.email = 'ana.novak@email.si';
    this.contact1.company = 'Mercator';

    this.contact2.name = 'Bojan';
    this.contact2.surname = 'Kralj';
    this.contact2.phone = '+38640123456';
    this.contact2.email = 'bojan.kralj@email.si';

    this.contactClassText1 = {
      'text-success': this.contact1.company === '',
      'text-primary': this.contact1.company !== ''
    }

    this.contactClassText2 = {
      'text-success': this.contact2.company === '',
      'text-primary': this.contact2.company !== ''
    }

    this.contactClassButton1 = {
      'btn-success': this.contact1.company === '',
      'btn-primary': this.contact1.company !== ''
    }

    this.contactClassButton2 = {
      'btn-success': this.contact2.company === '',
      'btn-primary': this.contact2.company !== ''
    }
    */
    /*
    this.name = 'Ana';
    this.surname = 'Novak';
    this.phone = '+38640123456';
    this.email = 'ana.novak@email.si';
    this.company = 'Mercator';

    this.name2 = 'Bojan';
    this.surname2 = 'Kralj';
    this.phone2 = '+38640123456';
    this.email2 = 'bojan.kralj@email.si';
    */
  }

  editButton(contact: Contact) {
    let tekst = '';

    if(contact.company) {
      tekst = `Urejanje kontakta ${contact.name} ${contact.surname}:\nTelefon: ${contact.phone}\nEmail: ${contact.email}\nPodjetje: ${contact.company}`;
      console.log(tekst);
    } else {
      tekst = `Urejanje kontakta ${contact.name} ${contact.surname}:\nTelefon: ${contact.phone}\nEmail: ${contact.email}`;
      console.log(tekst);
    }

    alert(tekst);
  }

  private loadContacts() {
    this.contactsService.getAllContacts().subscribe({
      next: (data) => {
        this.contacts = data.map((obj: any) => new Contact(
          obj.id || -1,
          obj.name || '',
          obj.surname || '',
          obj.phone || '',
          obj.email || '',
          obj.company || ''
        ));
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
      },
      complete: () => {
        console.log('Contacts loaded successfully.', this.contacts);
      }
    });
  }

  addContactClassText(contact: Contact) {
    return {
      'text-success': contact.company === '',
      'text-primary': contact.company !== ''
    }
  }

  addContactClassButton(contact: Contact) {
    return {
      'btn-success': contact.company === '',
      'btn-primary': contact.company !== ''
    }
  }
}
