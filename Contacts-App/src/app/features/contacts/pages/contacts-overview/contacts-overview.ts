import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-overview',
  standalone: false,
  templateUrl: './contacts-overview.html',
  styleUrl: './contacts-overview.css'
})
export class ContactsOverview implements OnInit {

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

  constructor() {}

  ngOnInit(): void {
    this.name = 'Ana';
    this.surname = 'Novak';
    this.phone = '+38640123456';
    this.email = 'ana.novak@email.si';
    this.company = 'Mercator';

    this.name2 = 'Bojan';
    this.surname2 = 'Kralj';
    this.phone2 = '+38640123456';
    this.email2 = 'bojan.kralj@email.si';
  }

}
