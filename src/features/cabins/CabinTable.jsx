import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Filter from "../../ui/Filter";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const {data: cabins, isLoading, error} = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading cabins...</div>;
  
  if (!cabins || cabins.length === 0) return <Empty resource="cabins" />;

  const filterValue = searchParams.get('discount')||'all';
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0);
  const sortBy = searchParams.get('sortBy')||'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a,b)=>{
    // 创建字段映射
    const fieldMapping = {
      name: 'name',
      price: 'regularPrice',
      capacity: 'maxCapacity'
    };
    
    // 获取实际的字段名
    const actualField = fieldMapping[field] || field;
    
    if(field === 'name') {
      return direction === 'asc' 
        ? a[actualField].localeCompare(b[actualField])
        : b[actualField].localeCompare(a[actualField]);
    }
    
    // 数字类型字段的排序
    if(direction === 'asc') return a[actualField] - b[actualField];
    if(direction === 'desc') return b[actualField] - a[actualField];
  });
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr" style={{ width: '100%' }}>
        <Table.Header>
          <div></div>
          <div>cabin </div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        )} />
      </Table>
    </Menus>
  );
}

export default CabinTable;
