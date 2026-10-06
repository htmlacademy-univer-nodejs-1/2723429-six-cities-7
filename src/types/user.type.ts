import {UserType} from './user-type.type';

export type User = {
  name: string,
  email: string,
  photoUrl: string,
  password: string,
  type: UserType
}
