import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      toast.success(`User updated successfully`);
      queryClient.setQueryData(["user"], data?.user);
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}

export default useUpdateUser;
