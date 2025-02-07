import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import styled from 'styled-components';
import CabinTable from "./CabinTable";
const AddCabinButton = styled.div`
  width: 100%;
  padding: 2.4rem 4rem;
  
  & button {
    width: 100%;
  }
`;

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((open) => !open)}>Add new cabin</Button>

//       {isOpenModal && (
//         <Modal onClose={()=>setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={()=>setIsOpenModal(false)}/>
//         </Modal>
//       )}
//     </>
//   );
// }
function Addcabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <AddCabinButton>
          <Button>Add new cabin</Button>
        </AddCabinButton>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      
    </Modal>
  );
}
export default Addcabin;
