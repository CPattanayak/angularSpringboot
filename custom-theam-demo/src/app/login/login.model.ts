export class LoginModel{
    id:string;
    username: string;
    password :string;
    address: string;
    email:string;
    gender:string;
    phone :string;
    constructor(id?: string, username?: string, password?: string, address?: string,
        email?:string,gender?:string,phone?:string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.address = address;
        this.email=email;
        this.gender=gender;
        this.phone=phone;
      }
}