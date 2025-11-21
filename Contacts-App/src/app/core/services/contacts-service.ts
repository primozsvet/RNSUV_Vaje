import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  // URL za API kontaktov
  private apiUrl = '/api/contacts';
  
  constructor(private http: HttpClient) {}

  // GET - metoda za pridobivanje vseh kontaktov
  public getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  // GET - metoda za pridobivanje posameznega kontakta po ID-ju
  public getContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  // POST - metoda za ustvarjanje novega kontakta
  public createContact(contactData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }
  
  // PUT - metoda za posodabljanje obstojecega kontakta po ID-ju
  public updateContact(id: number, contactData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contactData);
  }
  
  // DELETE - metoda za brisanje kontakta po ID-ju
  public deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
