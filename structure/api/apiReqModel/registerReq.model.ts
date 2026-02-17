import type { BaseApiReq } from "./base.model";

export interface RegisterReq extends BaseApiReq {
  username: string;
  email: string;
  password: string;
}
