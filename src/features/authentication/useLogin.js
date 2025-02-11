import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import supabase from "../../services/supabase";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);

      queryClient.setQueriesData(["user"], user.user);
      navigate("/");
    },
    onError: (err) => {
      console.log(`Error: ${err.message}`);

      toast.error(`Provided email or password are incorrect`);
    },
  });
  return { login, isLoginLoading };
}
