import type { BaseApiReq } from "./base.model";

export interface LoginReq extends BaseApiReq {
  username: string;
  password: string;
}
