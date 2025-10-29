import { Component, OnInit } from '@angular/core';

import { Contact } from '../../../../shared/classes/contact';

@Component({
  selector: 'app-contacts-overview',
  standalone: false,
  templateUrl: './contacts-overview.html',
  styleUrl: './contacts-overview.css'
})
export class ContactsOverview implements OnInit {

  public contact1: Contact = new Contact('', '', '', '', '');
  public contact2: Contact = new Contact('', '', '', '', '');

  public contactClassText1 = {};
  public contactClassText2 = {};

  public contactClassButton1 = {};
  public contactClassButton2 = {};

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

  constructor() {}

  ngOnInit(): void {
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

  editButton(name: string, surname: string, phone: string, email: string, company: string) {
    let tekst = '';

    if(company) {
      tekst = `Urejanje kontakta ${name} ${surname}:\nTelefon: ${phone}\nEmail: ${email}\nPodjetje: ${company}`;
      console.log(tekst);
    } else {
      tekst = `Urejanje kontakta ${name} ${surname}:\nTelefon: ${phone}\nEmail: ${email}`;
      console.log(tekst);
    }

    alert(tekst);
  }

}
