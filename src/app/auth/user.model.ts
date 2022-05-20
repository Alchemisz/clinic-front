import { LoginComponent } from '../login/login.component';

export class User {
  constructor(
    public login: string,
    private _token: string,
    public userId: number // private _tokenExpirationDate: Date
  ) {}

  get token() {
    // if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
    //     return null;
    // }
    return this._token;
  }
}
