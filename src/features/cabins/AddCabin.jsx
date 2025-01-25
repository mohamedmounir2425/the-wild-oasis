import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>

      <Modal.Open opens="table">
        <Button>Show Cabin Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>
    </Modal>
  );
}

// function AddCabin() {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <>
//       {" "}
//       <Button onClick={() => setShowForm((s) => !s)}>Add cabin</Button>
//       {/* {showForm && <CreateCabinForm />} */}
//       {showForm && (
//         <Modal onClose={() => setShowForm(false)}>
//           <CreateCabinForm onCloseModal={() => setShowForm(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
