import { UserRole } from "./roles";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}; 