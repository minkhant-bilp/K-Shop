import { useMutation } from "@tanstack/react-query";
import { AuthServices } from "@/structure/api/services/authServices";
import type { RegisterReq } from "@/structure/api/apiReqModel";
import type { RegisterRes } from "@/structure/api/apiResModel";

export const useAuth = () => {
  const registerMutation = useMutation<RegisterRes, Error, RegisterReq>({
    mutationFn: (data) => AuthServices.register(data),
  });

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
  };
};
