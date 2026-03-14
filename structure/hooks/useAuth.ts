import type { LoginReq, RegisterReq } from "@/structure/api/apiReqModel";
import type { LoginRes, RegisterRes, User } from "@/structure/api/apiResModel";
import { AuthServices } from "@/structure/api/services/authServices";
import useAuthStore from "@/structure/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  const registerMutation = useMutation<RegisterRes, Error, RegisterReq>({
    mutationFn: (data) => AuthServices.register(data),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
  });

  const loginMutation = useMutation<LoginRes, Error, LoginReq>({
    mutationFn: (data) => AuthServices.login(data),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
  });

  const getCurrentUser = async (): Promise<User> => {
    const response = await AuthServices.getCurrentUser();
    return response;
  };

  return {
    register: registerMutation.mutateAsync,
    registerMutation: {
      mutate: registerMutation.mutate,
      mutateAsync: registerMutation.mutateAsync,
      isPending: registerMutation.isPending,
      isError: registerMutation.isError,
      isSuccess: registerMutation.isSuccess,
      error: registerMutation.error,
      data: registerMutation.data,
      reset: registerMutation.reset,
    },
    login: loginMutation.mutateAsync,
    loginMutation: {
      mutate: loginMutation.mutate,
      mutateAsync: loginMutation.mutateAsync,
      isPending: loginMutation.isPending,
      isError: loginMutation.isError,
      isSuccess: loginMutation.isSuccess,
      error: loginMutation.error,
      data: loginMutation.data,
      reset: loginMutation.reset,
    },
    getCurrentUser,
  };
};
