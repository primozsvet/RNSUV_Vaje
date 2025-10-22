import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsEdit } from './contacts-edit';

describe('ContactsEdit', () => {
  let component: ContactsEdit;
  let fixture: ComponentFixture<ContactsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactsEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
