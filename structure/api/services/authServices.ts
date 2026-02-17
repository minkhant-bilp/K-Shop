import type { LoginReq, RegisterReq } from "@/structure/api/apiReqModel";
import type { LoginRes, RegisterRes } from "@/structure/api/apiResModel";
import { API_ENDPOINTS } from "@/structure/api/endpoints";
import apiHelper from "@/structure/utils/apiHelper";

export const AuthServices = {
  register: async (reqBody: RegisterReq): Promise<RegisterRes> => {
    const response = await apiHelper.post<RegisterRes>(
      API_ENDPOINTS.register,
      reqBody,
    );
    return response.data;
  },
  login: async (reqBody: LoginReq): Promise<LoginRes> => {
    const response = await apiHelper.post<LoginRes>(
      API_ENDPOINTS.login,
      reqBody,
    );
    return response.data;
  },
};
