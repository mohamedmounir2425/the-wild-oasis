import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, setShowForm }) {
  // #cabin_edit
  const { id: editId, ...editValues } = cabinToEdit;
  // #Create
  const { isCreating, createCabin } = useCreateCabin();
  // #Edit
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  // #hook_form
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: editId ? editValues : {},
  });

  // #Submit
  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!editId)
      createCabin(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    else
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => setShowForm((s) => !s),
        }
      );
  };
  // #JSX
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow error={errors.name?.message} label={"Cabin name"}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors.maxCapacity?.message} label={"Maximum capacity"}>
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow error={errors.regularPrice?.message} label={"Regular price"}>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow error={errors.discount?.message} label={"Discount"}>
        <Input
          type="number"
          disabled={isWorking}
          id="discount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price.",
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        error={errors.description?.message}
        label={"Description for website"}
      >
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label={"Cabin photo"}>
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image", {
            required: editId ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {editId ? "Edit" : "Create new"} cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
