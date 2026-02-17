import type { User } from "./user.model";

export interface LoginRes {
  token: string;
  user: User;
}
