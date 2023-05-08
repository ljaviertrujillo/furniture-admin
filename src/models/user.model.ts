export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  id: number;
  name: string;
  email: string;
  isNew: true;
  isUpdated: false;
}
