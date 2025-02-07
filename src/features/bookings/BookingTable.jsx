import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
function BookingTable() {
  const { bookings, isLoading, error, count } = useBookings();
  
  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading bookings...</div>;
  if (!bookings || bookings.length === 0) return <Empty resource="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem" style={{ width: '100%' }}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>
        <Table.Body 
          data={bookings} 
          render={(booking) => (
            <BookingRow booking={booking} key={booking.id} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}
export default BookingTable;