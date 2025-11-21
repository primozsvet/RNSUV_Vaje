export class Contact {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    company: string;

    constructor(id: number, name: string, surname: string, phone: string, email: string, company: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
        this.company = company;
    }
}
