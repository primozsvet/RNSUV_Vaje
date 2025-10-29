export class Contact {
    name: string;
    surname: string;
    phone: string;
    email: string;
    company: string;

    constructor(name: string, surname: string, phone: string, email: string, company: string) {
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
        this.company = company;
    }
}
