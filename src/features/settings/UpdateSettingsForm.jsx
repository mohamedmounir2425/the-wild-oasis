import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSetting } from "./useSetting";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSetting();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const handleUpdateSetting = (e, field) => {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  };

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          defaultValue={minBookingLength}
          type="number"
          id="min-nights"
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          type="number"
          id="max-nights"
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
