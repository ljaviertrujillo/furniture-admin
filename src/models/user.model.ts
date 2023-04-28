export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser {
  id: number;
  name: string;
  email: string;
}
