import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("  cabin Edited successfully");
      queryClient.invalidateQueries("cabins");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCabin };
}
