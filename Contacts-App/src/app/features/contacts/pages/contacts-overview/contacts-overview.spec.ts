import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsOverview } from './contacts-overview';

describe('ContactsOverview', () => {
  let component: ContactsOverview;
  let fixture: ComponentFixture<ContactsOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsOverview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
