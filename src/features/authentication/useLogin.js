import { useMutation } from "@tanstack/react-query";
import { Login as LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    onSuccess: (data) => {
      console.log(data);

      navigate("/");
    },
    onError: (err) => {
      console.log(`Error: ${err.message}`);

      toast.error(`Provided email or password are incorrect`);
    },
  });
  return { login, isLoginLoading };
}
