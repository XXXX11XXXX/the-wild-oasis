import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/Addcabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
  // const AddCabinButton = styled.div`
//   padding: 2.4rem 4rem;
//   margin: 2.4rem 0;
//   width: 100%;

//   & button {
//     width: 100%;
//   }
// `;

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Filter/Sort</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />

        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
