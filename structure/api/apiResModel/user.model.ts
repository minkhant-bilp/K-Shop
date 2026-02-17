import type { BaseEntity } from "./base.model";

export type UserRole = "USER" | "ADMIN" | "MODERATOR";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export interface User extends BaseEntity {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
