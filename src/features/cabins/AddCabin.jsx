import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {" "}
      <Button onClick={() => setShowForm((s) => !s)}>Add cabin</Button>
      {/* {showForm && <CreateCabinForm />} */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm onCloseModal={() => setShowForm(false)} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
