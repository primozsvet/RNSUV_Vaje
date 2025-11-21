export class User {
    id: number;
    name: string;
    surname: string;
    email: string;
    pass: string;

    constructor(id: number, name: string, surname: string, email: string, pass: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.pass = pass;
    }
}
