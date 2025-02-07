import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterField="discount" options={[{label:'All', value:'all'},
         {label:'No discount', value:'no-discount'}, 
         {label:'With discount', value:'with-discount'}]} />
    <SortBy options={[{label:'sort by name(A-Z)', value:'name-asc'},
          {label:'sort by name(Z-A)', value:'name-desc'},
         {label:'sort by price(low first)', value:'price-asc'}, 
         {label:'sort by price(high first)', value:'price-desc'},
         {label:'sort by capacity(low first)', value:'capacity-asc'},
         {label:'sort by capacity(high first)', value:'capacity-desc'}
         ]}/>
    </TableOperations>
  );
}

export default CabinTableOperations;
