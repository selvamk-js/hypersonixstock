export interface IUser {
  email: string;
  id: string;
  givenName: string;
  familyName: string;
  photo: string; // url
  name: string;
}

export interface IUserData {
  idToken: string;
  serverAuthCode: string;
  scopes: Array<string>;
  user: IUser;
}

export interface ILoginStore {
  userData: IUserData;
}
