import type { User } from "./user.model";

export interface RegisterRes {
  token: string;
  user: User;
}
