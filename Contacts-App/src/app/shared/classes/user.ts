export class User {
    name: string;
    surname: string;
    email: string;
    pass: string;

    constructor(name: string, surname: string, email: string, pass: string) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.pass = pass;
    }
}
